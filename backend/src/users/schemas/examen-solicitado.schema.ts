import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ExamenSolicitado {
  @Prop({ required: true })
  examenId: string; //

  @Prop({ required: true })
  mascotaId: string;

  @Prop({ default: 'pendiente' })
  estado: string;

  @Prop({ default: Date.now })
  fechaSolicitud: Date;
}

export const ExamenSolicitadoSchema =
  SchemaFactory.createForClass(ExamenSolicitado);
