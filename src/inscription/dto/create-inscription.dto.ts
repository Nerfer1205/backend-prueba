import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInscriptionDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
