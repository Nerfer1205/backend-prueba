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
import { UserscoursesService } from './userscourses.service';
import { CreateUserscourseDto } from './dto/create-userscourse.dto';
import { UpdateUserscourseDto } from './dto/update-userscourse.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.guard'; 
import { Roles } from 'src/auth/auth.decorator'; 

@Controller('userscourses')
@UseGuards(AuthGuard, RolesGuard) // Aplicar guardias de autenticación y roles a todo el controlador
export class UserscoursesController {
  constructor(private readonly userscoursesService: UserscoursesService) {}

  @Roles('Coordinador', 'Admin', 'Docente') // Roles permitidos para crear
  @Post()
  async create(@Body() createUserscourseDto: CreateUserscourseDto) {
    try {
      return await this.userscoursesService.create(createUserscourseDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente', 'Estudiante') // Roles permitidos para obtener todos
  @Get()
  async findAll() {
    try {
      return await this.userscoursesService.findAll();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente', 'Estudiante') // Roles permitidos para obtener uno específico
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userscoursesService.findOne(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente') // Roles permitidos para actualizar
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserscourseDto: UpdateUserscourseDto) {
    try {
      return await this.userscoursesService.update(+id, updateUserscourseDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente') // Roles permitidos para eliminar
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userscoursesService.remove(+id);
      return { message: 'Userscourse deleted successfully' };
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
