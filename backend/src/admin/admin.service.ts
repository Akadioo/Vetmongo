import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { Role } from 'src/auth/enums/role.enum';
import { Secretaria } from 'src/secretaria/schemas/secretaria.schema';
import { Veterinario } from 'src/veterinario/schemas/veterinario.schema.dto';
import { CreateSecretariaDto } from './dto/create-secretaria.dto';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Secretaria.name)
    private readonly secretariaModel: Model<Secretaria>,
    @InjectModel(Veterinario.name)
    private readonly veterinarioModel: Model<Veterinario>,
  ) {}

  async crearSecretaria(dto: CreateSecretariaDto) {
    const exists = await this.userModel.findOne({ username: dto.username });
    if (exists) {
      throw new ConflictException('Nombre de usuario ya en uso');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = new this.userModel({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      role: Role.SECRETARIA,
    });

    const savedUser = await newUser.save();
    await this.secretariaModel.create({ userId: savedUser._id });

    return { message: 'Secretaria creada correctamente' };
  }

  async crearVeterinario(dto: CreateVeterinarioDto) {
    const exists = await this.userModel.findOne({ username: dto.username });
    if (exists) {
      throw new ConflictException('Nombre de usuario ya en uso');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = new this.userModel({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      role: Role.VETERINARIO,
    });

    const savedUser = await newUser.save();
    await this.veterinarioModel.create({ userId: savedUser._id });

    return { message: 'Veterinario creado correctamente' };
  }
}
