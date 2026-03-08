import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import {
  Secretaria,
  SecretariaSchema,
} from 'src/secretaria/schemas/secretaria.schema';
import {
  Veterinario,
  VeterinarioSchema,
} from 'src/veterinario/schemas/veterinario.schema.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Secretaria.name, schema: SecretariaSchema },
      { name: Veterinario.name, schema: VeterinarioSchema },
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
