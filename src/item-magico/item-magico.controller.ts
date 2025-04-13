import {
    Controller,
    Post,
    Get,
    Param,
    Delete,
    Body,
  } from '@nestjs/common';
  import { ItemMagicoService } from './item-magico.service';
  import { CreateItemMagicoDto } from './dto/create-item-magico.dto';
  import { ItemMagicoDocument } from './entities/item-magico.entity';
  
  @Controller('item-magico')
  export class ItemMagicoController {
    constructor(private readonly itemService: ItemMagicoService) {}
  
    @Post()
    async create(@Body() dto: CreateItemMagicoDto): Promise<ItemMagicoDocument> {
      return this.itemService.create(dto);
    }
  
    @Get()
    async findAll(): Promise<ItemMagicoDocument[]> {
      return this.itemService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ItemMagicoDocument> {
      return this.itemService.findOne(id);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<ItemMagicoDocument> {
      return this.itemService.remove(id);
    }
  }
  