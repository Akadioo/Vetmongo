import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamenesDisponiblesService } from './examenes-disponibles.service';
import { ExamenesDisponiblesController } from './examenes-disponibles.controller';
import {
  ExamenDisponible,
  ExamenDisponibleSchema,
} from './schema/examen-disponible.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamenDisponible.name, schema: ExamenDisponibleSchema },
    ]),
  ],
  providers: [ExamenesDisponiblesService],
  controllers: [ExamenesDisponiblesController],
  exports: [ExamenesDisponiblesService],
})
export class ExamenesDisponiblesModule {}
