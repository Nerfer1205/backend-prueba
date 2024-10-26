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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.guard'; 
import { Roles } from 'src/auth/auth.decorator'; 

@Controller('categories')
@UseGuards(AuthGuard, RolesGuard) // Aplicamos los guardias globalmente en el controlador
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles('Coordinador', 'Admin')
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente', 'Estudiante')
  @Get()
  async findAll() {
    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin', 'Docente', 'Estudiante')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoriesService.findOne(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoriesService.update(+id, updateCategoryDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Coordinador', 'Admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.categoriesService.remove(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2011':
          throw new BadRequestException('Required field is missing');
        default:
          throw new InternalServerErrorException('An unknown error occurred');
      }
    } else if (error instanceof NotFoundException) {
      throw error; // Si es una excepción de no encontrado, simplemente vuelve a lanzarla
    } else {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
