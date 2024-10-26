import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { ModalitiesModule } from './modalities/modalities.module';
import { InscriptionModule } from './inscription/inscription.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { UserscoursesModule } from './userscourses/userscourses.module';
import { CredentialsModule } from './credentials/credentials.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [RolesModule, CategoriesModule, ModalitiesModule, InscriptionModule, UsersModule, CoursesModule, UserscoursesModule, CredentialsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
