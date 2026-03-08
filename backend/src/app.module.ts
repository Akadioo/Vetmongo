import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SecretariaModule } from './secretaria/secretaria.module';
import { VeterinarioModule } from './veterinario/veterinario.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ConfigModule } from '@nestjs/config';
import { ExamenesDisponiblesModule } from './examenes-disponibles/examenes-disponibles.module';
import { ClientesModule } from './clientes/clientes.module';
import { PrestacionesModule } from './prestaciones/prestaciones.module';
import { ServiciosModule } from './servicios/servicios.module';
import { PrestacionesController } from './prestaciones/prestaciones.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/Vetmongo',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    SecretariaModule,
    VeterinarioModule,
    MascotasModule,
    ExamenesDisponiblesModule,
    ClientesModule,
    PrestacionesModule,
    ServiciosModule,
  ],
  controllers: [AppController, PrestacionesController],
  providers: [AppService],
})
export class AppModule {}
