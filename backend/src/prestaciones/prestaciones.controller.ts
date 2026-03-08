import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PrestacionesService } from './prestaciones.service';
import { CreatePrestacionesDto } from './dto/create-prestaciones.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('prestaciones')
export class PrestacionesController {
  constructor(private readonly service: PrestacionesService) {}

  @Post()
  async create(@Body() dto: CreatePrestacionesDto) {
    return this.service.create(dto);
  }

  @Get('cliente/:clienteId')
  async getByCliente(@Param('clienteId') id: string) {
    return this.service.findByCliente(id);
  }

  @Get('mascota/:mascotaId')
  async getByMascota(@Param('mascotaId') id: string) {
    return this.service.findByMascota(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENTE)
  @Put(':id/cancelar')
  async cancelarPrestacion(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;

   

    return this.service.cancelarPrestacion(id, userId);
  }
}
