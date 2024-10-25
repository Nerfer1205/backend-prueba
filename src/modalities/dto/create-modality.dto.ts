import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModalityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}