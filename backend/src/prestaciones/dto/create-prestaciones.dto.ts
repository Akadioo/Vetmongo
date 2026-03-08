import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePrestacionesDto {
  @IsString()
  @IsNotEmpty()
  clienteId: string;

  @IsString()
  @IsNotEmpty()
  mascotaId: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  fecha?: Date;
}
