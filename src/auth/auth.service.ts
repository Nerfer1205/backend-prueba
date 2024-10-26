import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private credentialsService: CredentialsService,
    private jwtService: JwtService,
    private userService: UsersService,
    private roleService: RolesService
  ) {}

  async signIn(alias: string, pass: string): Promise<any> {
    // Busca las credenciales por alias
    const credential = await this.credentialsService.findByAlias(alias);
    
    // Verifica la contraseña usando bcrypt
    const passwordMatch = await bcrypt.compare(pass, credential.password);
    if (!credential || !passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userId = credential.userId;
    const user = await this.userService.findOne(userId);
    const role_id = user.roleId;

    const role = await this.roleService.findOne(role_id);

    const { password, ...result } = credential;

    // Genera el token JWT
    const token = this.jwtService.sign({ username: result.alias, sub: result.id, role: role.name });
    
    // Retorna el token y los datos del usuario
    return {
      ...result,
      access_token: token,
      role: role.name
    };
  }
}
