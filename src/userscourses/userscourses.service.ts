import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserscourseDto } from './dto/create-userscourse.dto';
import { UpdateUserscourseDto } from './dto/update-userscourse.dto';
import { PrismaService } from 'src/prisma.service';
import { UserCourse } from '@prisma/client';

@Injectable()
export class UserscoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserscourseDto): Promise<UserCourse> {
    return this.prisma.userCourse.create({ data });
  }

  async findAll(): Promise<UserCourse[]> {
    return this.prisma.userCourse.findMany();
  }

  async findOne(id: number): Promise<UserCourse> {
    const userCourse = await this.prisma.userCourse.findUnique({
      where: { id },
    });

    if (!userCourse) {
      throw new NotFoundException(`UserCourse with ID ${id} not found`);
    }

    return userCourse;
  }

  async update(id: number, data: UpdateUserscourseDto): Promise<UserCourse> {
    await this.findOne(id); // Verifica si el curso de usuario existe antes de intentar actualizar

    return this.prisma.userCourse.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Verifica si el curso de usuario existe antes de intentar eliminar

    await this.prisma.userCourse.delete({
      where: { id },
    });

    return { message: 'UserCourse deleted successfully' }; // Mensaje de confirmación
  }
}
