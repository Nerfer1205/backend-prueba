import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createInscriptionDto: CreateInscriptionDto) {
    try {
      return await this.inscriptionService.create(createInscriptionDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.inscriptionService.findAll();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.inscriptionService.findOne(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInscriptionDto: UpdateInscriptionDto) {
    try {
      return await this.inscriptionService.update(+id, updateInscriptionDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.inscriptionService.remove(+id);
      return { message: 'Inscription deleted successfully' }; // Mensaje de confirmación
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @UseGuards(AuthGuard)
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
