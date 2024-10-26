import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.guard'; 
import { Roles } from 'src/auth/auth.decorator'; 

@Controller('roles')
@UseGuards(AuthGuard, RolesGuard) // Aplicar guardias de autenticación y roles a todo el controlador
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles('Admin') // Rol permitido para crear roles
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return await this.rolesService.create(createRoleDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin') // Rol permitido para obtener todos los roles
  @Get()
  async findAll() {
    try {
      return await this.rolesService.findAll();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente', 'Estudiante')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.rolesService.findOne(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin') // Rol permitido para actualizar roles
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return await this.rolesService.update(+id, updateRoleDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin') // Rol permitido para eliminar roles
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.rolesService.remove(+id);
      return { message: 'Role deleted successfully' }; // Mensaje de confirmación
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2011':
          throw new BadRequestException('Required field is missing'); // Manejo del error P2011
        default:
          throw new InternalServerErrorException('An unknown error occurred'); // Manejo de otros errores
      }
    } else if (error instanceof NotFoundException) {
      throw error; // Si es una excepción de no encontrado, simplemente vuelve a lanzarla
    } else {
      throw new InternalServerErrorException('An unexpected error occurred'); // Manejo de errores no conocidos
    }
  }
}
