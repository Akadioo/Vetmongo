import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateSecretariaDto } from './dto/create-secretaria.dto';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('crear-secretaria')
  async crearSecretaria(@Body() dto: CreateSecretariaDto) {
    return this.adminService.crearSecretaria(dto);
  }

  @Post('crear-veterinario')
  async crearVeterinario(@Body() dto: CreateVeterinarioDto) {
    return this.adminService.crearVeterinario(dto);
  }
}
