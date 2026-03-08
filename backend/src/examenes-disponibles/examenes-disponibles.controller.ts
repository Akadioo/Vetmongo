import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExamenesDisponiblesService } from './examenes-disponibles.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('examenes-disponibles')
export class ExamenesDisponiblesController {
  constructor(private readonly examenesService: ExamenesDisponiblesService) {}

  @Post()
  @Roles(Role.SECRETARIA)
  async crear(
    @Body() dto: { nombre: string; valor: number; descripcion: string },
  ) {
    return this.examenesService.crearExamen(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listar() {
    return this.examenesService.listarTodos();
  }
}
