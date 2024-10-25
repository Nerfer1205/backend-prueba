import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { PrismaService } from 'src/prisma.service';
import { Credential } from '@prisma/client';
import * as bcrypt from 'bcrypt'; // Para el hash de contraseñas

@Injectable()
export class CredentialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    // Verifica si el usuario existe antes de crear la credencial
    const userExists = await this.prisma.user.findUnique({
      where: { id: createCredentialDto.userId },
    });

    if (!userExists) {
      throw new BadRequestException(`User with ID ${createCredentialDto.userId} does not exist`); // Manejo si el usuario no existe
    }

    const hashedPassword = await bcrypt.hash(createCredentialDto.password, 10); // Hash de la contraseña

    return this.prisma.credential.create({
      data: {
        alias: createCredentialDto.alias,
        password: hashedPassword, // Guarda la contraseña hasheada
        user: { connect: { id: createCredentialDto.userId } }, // Conectar con el usuario
      },
    });
  }

  async findAll(): Promise<Credential[]> {
    return this.prisma.credential.findMany();
  }

  async findOne(id: number): Promise<Credential> {
    const credential = await this.prisma.credential.findUnique({
      where: { id },
    });

    if (!credential) {
      throw new NotFoundException(`Credential with ID ${id} not found`); // Manejo de no encontrado
    }

    return credential;
  }
  
  async findByAlias(alias: string): Promise<Credential> {
    const credential = await this.prisma.credential.findUnique({
      where: { alias },
    });

    if (!credential) {
      throw new NotFoundException(`Credential with alias ${alias} not found`); // Manejo de no encontrado
    }

    return credential;
  }

  async update(id: number, updateCredentialDto: UpdateCredentialDto): Promise<Credential> {
    const existingCredential = await this.findOne(id); // Verifica si la credencial existe

    const updatedData: Partial<Credential> = {
      alias: updateCredentialDto.alias ?? existingCredential.alias, // Mantiene el alias existente si no se proporciona uno nuevo
      password: updateCredentialDto.password ? await bcrypt.hash(updateCredentialDto.password, 10) : existingCredential.password, // Actualiza la contraseña si se proporciona
    };

    return this.prisma.credential.update({
      where: { id },
      data: updatedData,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Verifica si la credencial existe

    await this.prisma.credential.delete({
      where: { id },
    });

    return { message: 'Credential deleted successfully' }; // Mensaje de confirmación
  }
}
