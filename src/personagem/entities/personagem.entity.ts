import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PersonagemDocument = Personagem & Document;

@Schema()
export class Personagem {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  nomeAventureiro: string;

  @Prop({ required: true, enum: ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'] })
  classe: string;

  @Prop({ required: true, min: 1 })
  level: number;

  @Prop({ required: true, min: 0, max: 10 })
  forcaBase: number;

  @Prop({ required: true, min: 0, max: 10 })
  defesaBase: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ItemMagico' }], default: [] })
  itensMagicos: Types.ObjectId[];
}

export const PersonagemSchema = SchemaFactory.createForClass(Personagem);
