import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCredentialDto {
  @IsNotEmpty()
  @IsString()
  alias: string; // Campo para el alias

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Validación para la longitud mínima
  password: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
