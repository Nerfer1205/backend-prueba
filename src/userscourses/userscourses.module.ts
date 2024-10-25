import { Module } from '@nestjs/common';
import { UserscoursesService } from './userscourses.service';
import { UserscoursesController } from './userscourses.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserscoursesController],
  providers: [UserscoursesService, PrismaService],
})
export class UserscoursesModule {}
