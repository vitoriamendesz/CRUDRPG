import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemMagicoDto } from './dto/create-item-magico.dto';
import { ItemMagico, ItemMagicoDocument } from './entities/item-magico.entity';

@Injectable()
export class ItemMagicoService {
  constructor(
    @InjectModel(ItemMagico.name)
    private readonly itemModel: Model<ItemMagicoDocument>,
  ) {}

  async create(dto: CreateItemMagicoDto): Promise<ItemMagicoDocument> {
    const { tipo, forca, defesa } = dto;

    const tiposPermitidos = ['Arma', 'Armadura', 'Amuleto'];
    if (!tiposPermitidos.includes(tipo)) {
      throw new BadRequestException(`Tipo inválido. Os tipos permitidos são: ${tiposPermitidos.join(', ')}`);
    }

    if (forca === 0 && defesa === 0) {
      throw new BadRequestException('O item mágico deve ter pelo menos força ou defesa maior que 0');
    }

    if (tipo === 'Arma' && defesa !== 0) {
      throw new BadRequestException('Itens do tipo Arma devem ter defesa igual a 0');
    }

    if (tipo === 'Armadura' && forca !== 0) {
      throw new BadRequestException('Itens do tipo Armadura devem ter força igual a 0');
    }

    if (forca > 10 || defesa > 10) {
      throw new BadRequestException('Força e Defesa devem ser no máximo 10');
    }

    const item = new this.itemModel(dto);
    return item.save();
  }

  async findAll(): Promise<ItemMagicoDocument[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<ItemMagicoDocument> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Item mágico não encontrado');
    }
    return item;
  }

  async remove(id: string): Promise<ItemMagicoDocument> {
    const item = await this.itemModel.findByIdAndDelete(id).exec();
    if (!item) {
      throw new NotFoundException('Item mágico não encontrado');
    }
    return item;
  }
}
