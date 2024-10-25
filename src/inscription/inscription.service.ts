import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { PrismaService } from 'src/prisma.service';
import { InscriptionStatus } from '@prisma/client';

@Injectable()
export class InscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInscriptionDto): Promise<InscriptionStatus> {
    return this.prisma.inscriptionStatus.create({ data });
  }

  async findAll(): Promise<InscriptionStatus[]> {
    return this.prisma.inscriptionStatus.findMany();
  }

  async findOne(id: number): Promise<InscriptionStatus> {
    const inscription = await this.prisma.inscriptionStatus.findUnique({
      where: { id },
    });

    if (!inscription) {
      throw new NotFoundException(`Inscription with ID ${id} not found`);
    }

    return inscription;
  }

  async update(id: number, data: UpdateInscriptionDto): Promise<InscriptionStatus> {
    await this.findOne(id); // Verifica si la inscripción existe antes de intentar actualizar

    return this.prisma.inscriptionStatus.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Verifica si la inscripción existe antes de intentar eliminar

    await this.prisma.inscriptionStatus.delete({
      where: { id },
    });

    return { message: 'Inscription deleted successfully' }; // Mensaje de confirmación
  }
}
