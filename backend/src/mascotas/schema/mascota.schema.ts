import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Mascota {
  @Prop({ required: true })
  mascotaId: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  especie: string;

  @Prop()
  raza: string;

  @Prop()
  sexo: string;

  @Prop()
  peso: number;

  @Prop({ required: true })
  fecha_nacimiento: Date;
}

export const MascotaSchema = SchemaFactory.createForClass(Mascota);
