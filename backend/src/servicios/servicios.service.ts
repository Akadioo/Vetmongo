import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Servicio } from './schemas/servicio.schema';
import { Model } from 'mongoose';
import { CreateServicioDto } from './dto/create-servicio.dto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectModel(Servicio.name)
    private servicioModel: Model<Servicio>,
  ) {}

  async findAll() {
    return this.servicioModel.find().exec();
  }

  async findById(id: string) {
    return this.servicioModel.findById(id).exec();
  }

  async generarNuevoIdServicio(): Promise<string> {
    const servicios = await this.servicioModel.find({}, { servicioId: 1 });
    const ids = servicios
      .map((s) => parseInt(s.servicioId.replace('serv', '')))
      .filter((n) => !isNaN(n));
    const siguiente = Math.max(...ids, 0) + 1;
    return `serv${siguiente}`;
  }

  async crearServicio(dto: CreateServicioDto) {
    const nuevoId = await this.generarNuevoIdServicio();

    const nuevo = new this.servicioModel({
      servicioId: nuevoId,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      duracion_aproximada_min: dto.duracion_aproximada_min,
      precio_referencial: dto.precio_referencial,
    });

    return nuevo.save();
  }
}
