import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prestacion, PrestacionDocument } from './schemas/prestaciones.schema';
import { CreatePrestacionesDto } from './dto/create-prestaciones.dto';
import { Cliente, ClienteDocument } from '../clientes/schemas/cliente.schema';

@Injectable()
export class PrestacionesService {
  constructor(
    @InjectModel(Prestacion.name)
    private prestacionModel: Model<PrestacionDocument>,
    @InjectModel(Cliente.name)
    private clienteModel: Model<ClienteDocument>,
  ) {}

  async create(dto: CreatePrestacionesDto): Promise<Prestacion> {
    try {
      const cliente = await this.clienteModel.findOne({
        clienteId: dto.clienteId,
      });

      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }

      const nuevoId = await this.generarNuevoIdPrestacion();

      const data = {
        prestacionId: nuevoId,
        clienteId: dto.clienteId,
        mascotaId: dto.mascotaId,
        tipo: dto.tipo,
        descripcion: dto.descripcion,
        fecha: new Date(),
        estado: 'pendiente',
      };

      const nuevaPrestacion = new this.prestacionModel(data);
      const saved = await nuevaPrestacion.save();

      await this.clienteModel.updateOne(
        { _id: cliente._id },
        { $push: { prestaciones: saved } },
      );

      return saved;
    } catch (err) {
      throw new InternalServerErrorException(
        'Error interno al crear prestación',
      );
    }
  }

  async findByCliente(clienteId: string): Promise<Prestacion[]> {
    return await this.prestacionModel.find({ clienteId }).exec();
  }

  async findByMascota(mascotaId: string): Promise<Prestacion[]> {
    return await this.prestacionModel.find({ mascotaId }).exec();
  }

  async generarNuevoIdPrestacion(): Promise<string> {
    const prestaciones = await this.prestacionModel.find(
      {},
      { prestacionId: 1 },
    );
    const ids = prestaciones
      .map((p) => parseInt(p.prestacionId?.replace('pres', '')))
      .filter((n) => !isNaN(n));
    const siguiente = Math.max(...ids, 0) + 1;
    return `pres${siguiente}`;
  }

  async cancelarPrestacion(
    prestacionId: string,
    userId: string,
  ): Promise<Prestacion> {
    console.log('Buscando cliente por userId:', userId);
    const cliente = await this.clienteModel.findOne({ userId });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const prestacion = await this.prestacionModel.findOne({
      prestacionId: prestacionId,
      clienteId: cliente.clienteId,
    });

    if (!prestacion) {
      throw new NotFoundException('Prestación no encontrada');
    }

    if (prestacion.estado !== 'pendiente') {
      throw new BadRequestException(
        'Solo se pueden cancelar prestaciones pendientes',
      );
    }

    prestacion.estado = 'cancelada';
    const updatedPrestacion = await prestacion.save();

    await this.clienteModel.updateOne(
      {
        _id: cliente._id,
        'prestaciones.prestacionId': prestacionId,
      },
      {
        $set: {
          'prestaciones.$.estado': 'cancelada',
        },
      },
    );

    return updatedPrestacion;
  }
}
