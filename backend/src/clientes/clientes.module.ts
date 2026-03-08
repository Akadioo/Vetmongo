import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Cliente, ClienteSchema } from './schemas/cliente.schema';
import { ClientesController } from './clientes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }]),
    UsersModule,
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
