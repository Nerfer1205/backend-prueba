import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';
import { Course } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto): Promise<Course> {
    return this.prisma.course.create({ data });
  }

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(id: number, data: UpdateCourseDto): Promise<Course> {
    await this.findOne(id); // Verifica si el curso existe antes de intentar actualizar

    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Verifica si el curso existe antes de intentar eliminar

    await this.prisma.course.delete({
      where: { id },
    });

    return { message: 'Course deleted successfully' }; // Mensaje de confirmación
  }
}
