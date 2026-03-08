import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Servicio extends Document {
  @Prop({ required: true, unique: true })
  servicioId: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  duracion_aproximada_min: number;

  @Prop()
  precio_referencial: number;
}

export const ServicioSchema = SchemaFactory.createForClass(Servicio);
