import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Personagem,
  PersonagemDocument,
} from './entities/personagem.entity';
import {
  ItemMagico,
  ItemMagicoDocument,
} from '../item-magico/entities/item-magico.entity';

@Injectable()
export class PersonagemService {
  constructor(
    @InjectModel(Personagem.name)
    private personagemModel: Model<PersonagemDocument>,
    @InjectModel(ItemMagico.name)
    private itemModel: Model<ItemMagicoDocument>,
  ) {}

  async create(createDto: CreatePersonagemDto): Promise<PersonagemDocument> {
    const { forcaBase, defesaBase, classe } = createDto;

    if (forcaBase + defesaBase > 10) {
      throw new BadRequestException(
        'A soma de força e defesa não pode passar de 10 pontos',
      );
    }

    const classesValidas = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'];
    if (!classesValidas.includes(classe)) {
      throw new BadRequestException('Classe inválida');
    }

    const personagem = new this.personagemModel({
      ...createDto,
      itensMagicos: [],
    });

    return personagem.save();
  }

  async findAll(): Promise<PersonagemDocument[]> {
    return this.personagemModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    const personagem = await this.personagemModel
      .findById(id)
      .populate('itensMagicos')
      .exec();

    if (!personagem) throw new NotFoundException('Personagem não encontrado');

    const { forcaBase, defesaBase, itensMagicos } = personagem;

    const itens = itensMagicos as unknown as ItemMagico[];

    const forcaItens = itens.reduce((soma, item) => soma + (item.forca || 0), 0);
    const defesaItens = itens.reduce((soma, item) => soma + (item.defesa || 0), 0);

    const statusTotal = {
      forcaTotal: forcaBase + forcaItens,
      defesaTotal: defesaBase + defesaItens,
    };

    return {
      ...personagem.toObject(),
      ...statusTotal,
    };
  }

  async update(id: string, nomeAventureiro: string): Promise<PersonagemDocument | null> {
    return this.personagemModel
      .findByIdAndUpdate(id, { nomeAventureiro }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PersonagemDocument | null> {
    return this.personagemModel.findByIdAndDelete(id).exec();
  }

  async adicionarItemMagicoAoPersonagem(idPersonagem: string, idItem: string): Promise<PersonagemDocument> {
    const personagem = await this.personagemModel
      .findById(idPersonagem)
      .populate('itensMagicos');

    if (!personagem) throw new NotFoundException('Personagem não encontrado');

    const item = await this.itemModel.findById(idItem);
    if (!item) throw new NotFoundException('Item mágico não encontrado');

    const itens = personagem.itensMagicos as unknown as ItemMagico[];

    const jaTemMesmoTipo = itens.some(
      (i) => i.tipo === item.tipo && item.tipo === 'Amuleto',
    );

    if (jaTemMesmoTipo) {
      throw new ConflictException('O personagem já possui um amuleto');
    }

    personagem.itensMagicos.push(item._id as Types.ObjectId);
    return personagem.save();
  }

  async listarItensMagicosPorPersonagem(id: string): Promise<ItemMagico[]> {
    const personagem = await this.personagemModel
      .findById(id)
      .populate('itensMagicos')
      .exec();

    if (!personagem) throw new NotFoundException('Personagem não encontrado');

    return personagem.itensMagicos as unknown as ItemMagico[];
  }

  async buscarAmuletoDoPersonagem(id: string): Promise<ItemMagico | null> {
    const personagem = await this.personagemModel
      .findById(id)
      .populate('itensMagicos')
      .exec();

    if (!personagem) throw new NotFoundException('Personagem não encontrado');

    const itens = personagem.itensMagicos as unknown as ItemMagico[];
    const amuleto = itens.find((item) => item.tipo === 'Amuleto');

    return amuleto || null;
  }

  async removerItemMagicoDoPersonagem(idPersonagem: string, idItem: string): Promise<PersonagemDocument> {
    const personagem = await this.personagemModel.findById(idPersonagem).exec();

    if (!personagem) throw new NotFoundException('Personagem não encontrado');

    personagem.itensMagicos = personagem.itensMagicos.filter(
      (itemId) => itemId.toString() !== idItem,
    );

    return personagem.save();
  }
}
