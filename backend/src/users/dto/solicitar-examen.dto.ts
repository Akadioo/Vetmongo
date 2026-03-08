import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SolicitarExamenDto {
  @ApiProperty()
  @IsNotEmpty()
  examenId: string;

  @ApiProperty()
  @IsNotEmpty()
  mascotaId: string;
}
