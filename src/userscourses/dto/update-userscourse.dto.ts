import { PartialType } from '@nestjs/mapped-types';
import { CreateUserscourseDto } from './create-userscourse.dto';

export class UpdateUserscourseDto extends PartialType(CreateUserscourseDto) {}
