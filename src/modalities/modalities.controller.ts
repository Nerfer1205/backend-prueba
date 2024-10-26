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
import { ModalitiesService } from './modalities.service';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.guard'; 
import { Roles } from 'src/auth/auth.decorator'; 

@Controller('modalities')
@UseGuards(AuthGuard, RolesGuard) // Aplicar guardias de autenticación y roles a todo el controlador
export class ModalitiesController {
  constructor(private readonly modalitiesService: ModalitiesService) {}

  @Roles('Coordinador', 'Admin') // Roles permitidos para crear modalidades
  @Post()
  async create(@Body() createModalityDto: CreateModalityDto) {
    try {
      return await this.modalitiesService.create(createModalityDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente', 'Estudiante') // Roles permitidos para obtener todas las modalidades
  @Get()
  async findAll() {
    try {
      return await this.modalitiesService.findAll();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente', 'Estudiante') // Roles permitidos para obtener una modalidad por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.modalitiesService.findOne(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin') // Roles permitidos para actualizar modalidades
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateModalityDto: UpdateModalityDto) {
    try {
      return await this.modalitiesService.update(+id, updateModalityDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin') // Roles permitidos para eliminar modalidades
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.modalitiesService.remove(+id);
      return { message: 'Modality deleted successfully' }; // Mensaje de confirmación
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

