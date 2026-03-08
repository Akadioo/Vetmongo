import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExamenDisponibleDocument = ExamenDisponible & Document;

@Schema()
export class ExamenDisponible {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  descripcion: string;
}

export const ExamenDisponibleSchema =
  SchemaFactory.createForClass(ExamenDisponible);
