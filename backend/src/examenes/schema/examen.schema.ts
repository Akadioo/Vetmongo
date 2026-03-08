import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class Examen {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  valor: number;

  @Prop()
  descripcion?: string;

  @Prop({ default: Date.now })
  fecha: Date;

  @Prop({ type: Types.ObjectId, ref: 'Mascota', required: true })
  mascotaId: Types.ObjectId;
}

export const ExamenSchema = SchemaFactory.createForClass(Examen);
