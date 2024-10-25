import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { PrismaService } from 'src/prisma.service';
import { Modality } from '@prisma/client';

@Injectable()
export class ModalitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateModalityDto): Promise<Modality> {
    return this.prisma.modality.create({ data });
  }

  async findAll(): Promise<Modality[]> {
    return this.prisma.modality.findMany();
  }

  async findOne(id: number): Promise<Modality> {
    const modality = await this.prisma.modality.findUnique({
      where: { id },
    });

    if (!modality) {
      throw new NotFoundException(`Modality with ID ${id} not found`); // Verifica si la modalidad existe
    }

    return modality; // Retorna la modalidad encontrada
  }

  async update(id: number, data: UpdateModalityDto): Promise<Modality> {
    await this.findOne(id); // Verifica si la modalidad existe antes de intentar actualizar

    return this.prisma.modality.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Verifica si la modalidad existe antes de intentar eliminar

    await this.prisma.modality.delete({
      where: { id },
    });

    return { message: 'Modality deleted successfully' }; // Mensaje de confirmación
  }
}
