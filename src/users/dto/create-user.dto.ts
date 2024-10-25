import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string; 

  @IsNotEmpty()
  @IsString()
  lastName: string; 

  @IsNotEmpty()
  @IsEmail()
  email: string; // Email único

  @IsNotEmpty()
  @IsPhoneNumber(null)
  phone: string; // Validación del número de teléfono

  @IsOptional()
  verifiedEmailAt?: Date; // Campo opcional para la fecha de verificación

  @IsNotEmpty()
  @IsInt()
  roleId: number; // ID del rol asociado
}
