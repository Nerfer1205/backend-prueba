import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserscourseDto {
  @IsNotEmpty()
  @IsInt()
  userId: number; // ID del usuario asociado

  @IsNotEmpty()
  @IsInt()
  courseId: number; // ID del curso asociado

  @IsNotEmpty()
  @IsInt()
  inscriptionId: number; // ID del estado de inscripción asociado
}