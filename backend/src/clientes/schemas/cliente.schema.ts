import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Mascota, MascotaSchema } from 'src/mascotas/schema/mascota.schema';
import {
  Prestacion,
  PrestacionSchema,
} from 'src/prestaciones/schemas/prestaciones.schema';

@Schema()
export class Cliente extends Document {
  @Prop({ required: true, unique: true })
  clienteId: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  rut: string;

  @Prop()
  edad: number;

  @Prop()
  telefono: string;

  @Prop()
  direccion: string;

  @Prop({ type: [MascotaSchema], default: [] })
  mascotas: Mascota[];

  @Prop({ type: [PrestacionSchema], default: [] })
  prestaciones: Prestacion[];

  @Prop({ required: true })
  userId: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
export type ClienteDocument = Cliente & Document;
