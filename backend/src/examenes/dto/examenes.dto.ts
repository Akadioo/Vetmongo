import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class ExamenesDto {
  @ApiProperty({ example: 'Hemograma' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 15000 })
  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @ApiProperty({ example: 'Examen de sangre completa' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
