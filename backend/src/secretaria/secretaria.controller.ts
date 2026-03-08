import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { ClientesService } from 'src/clientes/clientes.service';

@Controller('secretaria')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SECRETARIA)
export class SecretariaController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get('dashboard')
  getDashboard() {
    return { message: 'Bienvenida, secretaria.' };
  }
 
}
