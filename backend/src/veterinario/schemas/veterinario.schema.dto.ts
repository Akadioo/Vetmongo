import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VeterinarioDocument = Veterinario & Document;

@Schema()
export class Veterinario {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  especialidad?: string;
}

export const VeterinarioSchema = SchemaFactory.createForClass(Veterinario);
