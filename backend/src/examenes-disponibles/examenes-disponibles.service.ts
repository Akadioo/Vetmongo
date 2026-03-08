import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  ExamenDisponible,
  ExamenDisponibleDocument,
} from './schema/examen-disponible.schema';

@Injectable()
export class ExamenesDisponiblesService {
  constructor(
    @InjectModel(ExamenDisponible.name)
    private readonly examenModel: Model<ExamenDisponibleDocument>,
  ) {}

  async crearExamen(data: {
    nombre: string;
    valor: number;
    descripcion: string;
  }) {
    const nuevo = new this.examenModel(data);
    return nuevo.save();
  }

  async listarTodos() {
    return this.examenModel.find();
  }

  async buscarPorId(id: string) {
    return this.examenModel.findById(id);
  }
}
