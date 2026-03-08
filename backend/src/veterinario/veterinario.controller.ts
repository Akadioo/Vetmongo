import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('veterinario')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.VETERINARIO)
export class VeterinarioController {
  @Get('dashboard')
  getDashboard() {
    return { message: 'Bienvenida al dashboard de veterinario' };
  }
}
