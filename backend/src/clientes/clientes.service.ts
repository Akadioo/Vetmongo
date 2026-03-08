import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MascotaDto } from '../mascotas/dto/mascotas.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreatePrestacionesDto } from 'src/prestaciones/dto/create-prestaciones.dto';
import { Cliente, ClienteDocument } from './schemas/cliente.schema';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel(Cliente.name)
    private readonly clienteModel: Model<ClienteDocument>,
  ) {}

  async create(userId: string, dto: CreateClienteDto): Promise<Cliente> {
    const clienteId = await this.generarNuevoIdCliente();

    if (!dto.mascotas) {
      dto.mascotas = [];
    }

    dto.mascotas = dto.mascotas.filter((m) => m && Object.keys(m).length > 0);

  
    dto.mascotas = await Promise.all(
      dto.mascotas.map(async (m) => ({
        ...m,
        mascotaId: await this.generarNuevoIdMascota(),
      })),
    );

    const nuevoCliente = new this.clienteModel({
      clienteId,
      ...dto,
      userId: new Types.ObjectId(userId),
    });

    return nuevoCliente.save();
  }

  async generarNuevoIdCliente(): Promise<string> {
    const clientes = await this.clienteModel.find({}, { clienteId: 1 });
    const ids = clientes
      .map((c) => parseInt(c.clienteId.replace('cli', '')))
      .filter((n) => !isNaN(n));
    const siguiente = Math.max(...ids, 0) + 1;
    return `cli${siguiente}`;
  }

  async generarNuevoIdMascota(): Promise<string> {
    const clientes = await this.clienteModel.find({}, { mascotas: 1 });
    const ids: number[] = [];

    for (const cliente of clientes) {
      for (const mascota of cliente.mascotas) {
        const num = parseInt(String(mascota.mascotaId).replace('pet', ''));
        if (!isNaN(num)) ids.push(num);
      }
    }

    const siguiente = Math.max(...ids, 0) + 1;
    return `pet${siguiente}`;
  }

  async agregarMascota(clienteId: string, mascotaDto: MascotaDto) {
    const cliente = await this.clienteModel.findById(clienteId);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    if (cliente.mascotas.length >= 6) {
      throw new BadRequestException('No puedes agregar más de 6 mascotas');
    }

    const nuevaMascotaId = await this.generarNuevoIdMascota();

    cliente.mascotas.push({
      mascotaId: nuevaMascotaId,
      ...mascotaDto,
      fecha_nacimiento: new Date(mascotaDto.fecha_nacimiento),
    });

    await cliente.save();
    return cliente.mascotas;
  }

  async generarNuevoIdPrestacion(clienteId: string): Promise<string> {
    const cliente = await this.clienteModel.findById(clienteId);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const ids = cliente.prestaciones
      .map((p) => parseInt(p.prestacionId?.replace('pres', '')))
      .filter((n) => !isNaN(n));

    const siguiente = Math.max(...ids, 0) + 1;
    return `pres${siguiente}`;
  }

  async agregarPrestacion(dto: CreatePrestacionesDto) {
    const nuevaId = await this.generarNuevoIdPrestacion(dto.clienteId);

    return await this.clienteModel.updateOne(
      { _id: dto.clienteId },
      {
        $push: {
          prestaciones: {
            prestacionId: nuevaId,
            mascotaId: dto.mascotaId,
            tipo: dto.tipo,
            descripcion: dto.descripcion,
            fecha: dto.fecha || new Date(),
          },
        },
      },
    );
  }

  async findByUserId(userId: string): Promise<ClienteDocument | null> {
    return this.clienteModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('userId', 'nombre correo')
      .exec();
  }

  async eliminarPrestacion(clienteId: string, prestacionId: string) {
    const cliente = await this.clienteModel.findById(clienteId);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const resultado = await this.clienteModel.updateOne(
      { _id: clienteId },
      { $pull: { prestaciones: { prestacionId } } },
    );

    if (resultado.modifiedCount === 0) {
      throw new NotFoundException('Prestación no encontrada o ya eliminada');
    }

    return { message: 'Prestación eliminada correctamente' };
  }

  async actualizarMascota(userId: string, mascotaId: string, nuevaData: any) {
    return this.clienteModel.updateOne(
      { userId, 'mascotas.mascotaId': mascotaId },
      { $set: { 'mascotas.$': { ...nuevaData, mascotaId } } },
    );
  }

  async eliminarMascota(userId: string, mascotaId: string) {
    return this.clienteModel.updateOne(
      { userId },
      { $pull: { mascotas: { mascotaId } } },
    );
  }

  async obtenerMascotasYPrestacionesPorCliente(userId: string) {
    const cliente = await this.clienteModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    return this.clienteModel.aggregate([
      { $match: { _id: cliente._id } },
      {
        $project: {
          nombre: 1,
          correo: 1,
          clienteId: 1,
          userId: 1,
          mascotas: 1,
          prestaciones: 1,
        },
      },
    ]);
  }
}
