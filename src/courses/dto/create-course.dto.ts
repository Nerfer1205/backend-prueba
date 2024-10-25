import { IsNotEmpty, IsString, IsInt, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string; // Nombre del curso

  @IsNotEmpty()
  @IsInt()
  categoryId: number; // ID de la categoría asociada

  @IsNotEmpty()
  @IsInt()
  modalityId: number; // ID de la modalidad asociada

  @IsNotEmpty()
  @IsString()
  duration: string; // Duración del curso

  @IsNotEmpty()
  @IsNumber()
  fee: number; // Cuota del curso
}
