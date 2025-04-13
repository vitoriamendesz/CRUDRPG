import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';

@Controller('personagem')
export class PersonagemController {
  constructor(private readonly service: PersonagemService) {}

  @Post()
  create(@Body() dto: CreatePersonagemDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('nomeAventureiro') nome: string,
  ) {
    return this.service.update(id, nome);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':idPersonagem/item-magico/:idItem')
  adicionarItem(
    @Param('idPersonagem') idPersonagem: string,
    @Param('idItem') idItem: string,
  ) {
    return this.service.adicionarItemMagicoAoPersonagem(idPersonagem, idItem);
  }

  @Get(':id/itens-magicos')
  listarItens(@Param('id') id: string) {
    return this.service.listarItensMagicosPorPersonagem(id);
  }

  @Get(':id/amuleto')
  buscarAmuleto(@Param('id') id: string) {
    return this.service.buscarAmuletoDoPersonagem(id);
  }

  @Delete(':idPersonagem/item-magico/:idItem')
  removerItem(
    @Param('idPersonagem') idPersonagem: string,
    @Param('idItem') idItem: string,
  ) {
    return this.service.removerItemMagicoDoPersonagem(idPersonagem, idItem);
  }
}
