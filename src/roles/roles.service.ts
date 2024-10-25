import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';
import { Role } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`); // Lanzar NotFoundException si no se encuentra el rol
    }

    return role;
  }

  async update(id: number, data: UpdateRoleDto): Promise<Role> {
    await this.findOne(id); // Verifica si el rol existe antes de intentar actualizar

    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Verifica si el rol existe antes de intentar eliminar

    await this.prisma.role.delete({
      where: { id },
    });

    return { message: 'Role deleted successfully' }; // Mensaje de confirmación
  }
}
