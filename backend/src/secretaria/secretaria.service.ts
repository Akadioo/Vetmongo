import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Secretaria, SecretariaDocument } from './schemas/secretaria.schema';
import { CreateSecretariaDto } from 'src/admin/dto/create-secretaria.dto';

@Injectable()
export class SecretariaService {
  constructor(
    @InjectModel(Secretaria.name)
    private readonly secretariaModel: Model<SecretariaDocument>,
  ) {}

  async create(userId: string, dto: CreateSecretariaDto): Promise<Secretaria> {
    const secretaria = new this.secretariaModel({
      ...dto,
      userId: new Types.ObjectId(userId),
    });
    return secretaria.save();
  }

  async findByUserId(userId: string): Promise<Secretaria | null> {
    return this.secretariaModel.findOne({ userId }).exec();
  }
}
