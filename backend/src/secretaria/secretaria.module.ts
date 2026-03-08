import { Module } from '@nestjs/common';
import { SecretariaController } from './secretaria.controller';
import { SecretariaService } from './secretaria.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Secretaria, SecretariaSchema } from './schemas/secretaria.schema';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Secretaria.name, schema: SecretariaSchema },
    ]),
    ClientesModule,
  ],
  controllers: [SecretariaController],
  providers: [SecretariaService],
})
export class SecretariaModule {}
