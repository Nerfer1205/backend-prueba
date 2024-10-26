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
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.guard'; 
import { Roles } from 'src/auth/auth.decorator'; 

@Controller('credentials')
@UseGuards(RolesGuard) 
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async create(@Body() createCredentialDto: CreateCredentialDto) {
    try {
      return await this.credentialsService.create(createCredentialDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Get()
  @Roles('Admin') // Especifica los roles permitidos
  @UseGuards(AuthGuard)
  async findAll() {
    try {
      return await this.credentialsService.findAll();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.credentialsService.findOne(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin') // Especifica los roles permitidos
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCredentialDto: UpdateCredentialDto) {
    try {
      return await this.credentialsService.update(+id, updateCredentialDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin') // Especifica los roles permitidos
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.credentialsService.remove(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException('Alias already exists'); // Campo único
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
