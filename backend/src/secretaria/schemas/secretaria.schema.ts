import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SecretariaDocument = Secretaria & Document;

@Schema()
export class Secretaria {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  telefono?: string;
}

export const SecretariaSchema = SchemaFactory.createForClass(Secretaria);
