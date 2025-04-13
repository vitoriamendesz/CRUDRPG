// src/item-magico/entities/item-magico.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemMagicoDocument = ItemMagico & Document;

@Schema()
export class ItemMagico {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, enum: ['Arma', 'Armadura', 'Amuleto'] })
  tipo: string;

  @Prop({ required: true, min: 0, max: 10 })
  forca: number;

  @Prop({ required: true, min: 0, max: 10 })
  defesa: number;
}

export const ItemMagicoSchema = SchemaFactory.createForClass(ItemMagico);
