import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PrestacionDocument = Prestacion & Document;

@Schema({ collection: 'prestaciones' })
export class Prestacion {
  @Prop({ required: true })
  prestacionId: string;

  @Prop({ type: Types.ObjectId, required: true })
  clienteId: Types.ObjectId;

  @Prop({ required: true })
  mascotaId: string;

  @Prop()
  tipo: string;

  @Prop()
  descripcion: string;

  @Prop({ default: Date.now })
  fecha: Date;

  @Prop({ default: 'pendiente' })
  estado: string;
}

export const PrestacionSchema = SchemaFactory.createForClass(Prestacion);
