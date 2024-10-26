import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CredentialsService, PrismaService, UsersService, RolesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
  exports: [AuthService],
})
export class AuthModule { }
