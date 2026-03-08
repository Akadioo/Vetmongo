import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MascotaDto } from 'src/mascotas/dto/mascotas.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async registerCliente(
    @Body() body: { user: CreateUserDto; cliente: CreateClienteDto },
  ) {
    const user = await this.usersService.createUser({
      ...body.user,
      role: 'cliente',
    });

    return this.clientesService.create(
      (user as any)._id.toString(),
      body.cliente,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getPerfil(@Req() req: any) {
    const cliente = await this.clientesService.findByUserId(req.user.sub);
    if (!cliente) return { message: 'Cliente no encontrado' };
    return cliente;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CLIENTE)
  @Post('mascotas')
  async agregarMascota(@Req() req: any, @Body() mascotaDto: MascotaDto) {
    const cliente = await this.clientesService.findByUserId(req.user.sub);
    if (!cliente) throw new Error('Cliente no encontrado');
    return this.clientesService.agregarMascota(
      (cliente as any)._id.toString(),
      mascotaDto,
    );
  }

  @Delete(':clienteId/prestaciones/:prestacionId')
  async eliminarPrestacion(
    @Param('clienteId') clienteId: string,
    @Param('prestacionId') prestacionId: string,
  ) {
    return this.clientesService.eliminarPrestacion(clienteId, prestacionId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('mascotas/:mascotaId')
  async actualizarMascota(
    @Param('mascotaId') mascotaId: string,
    @Body() nuevaData: any,
    @Req() req,
  ) {
    const userId = req.user.sub;
    return this.clientesService.actualizarMascota(userId, mascotaId, nuevaData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('mascotas/:mascotaId')
  async eliminarMascota(@Param('mascotaId') mascotaId: string, @Req() req) {
    const userId = req.user.sub;
    return this.clientesService.eliminarMascota(userId, mascotaId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil-aggregate')
  async getPerfilConAggregate(@Req() req: any) {
    const resultado =
      await this.clientesService.obtenerMascotasYPrestacionesPorCliente(
        req.user.sub,
      );
    return resultado[0];
  }

 
}
