import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, NotFoundException, ConflictException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin')
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin')
  @UseGuards(AuthGuard)
  @Roles('Admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Roles('Admin')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(+id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2011':
          throw new BadRequestException('Required field is missing');
        case 'P2002':
          throw new ConflictException('User with this information already exists'); // Manejo de conflicto por datos únicos
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
