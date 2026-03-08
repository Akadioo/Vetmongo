import { Module } from '@nestjs/common';
import { PrestacionesService } from './prestaciones.service';
import { PrestacionesController } from './prestaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prestacion, PrestacionSchema } from './schemas/prestaciones.schema';
import { Cliente, ClienteSchema } from 'src/clientes/schemas/cliente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Prestacion.name, schema: PrestacionSchema },
      { name: Cliente.name, schema: ClienteSchema },
    ]),
  ],
  controllers: [PrestacionesController],
  providers: [PrestacionesService],
  exports: [PrestacionesService],
})
export class PrestacionesModule {}
