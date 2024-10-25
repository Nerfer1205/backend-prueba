import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
import { Credential } from '@prisma/client'; // Asegúrate de que el tipo Credential esté disponible
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private credentialsService: CredentialsService,
    private jwtService: JwtService,
  ) {}

  async signIn(alias: string, pass: string): Promise<any> {
    // Busca las credenciales por alias
    const credential = await this.credentialsService.findByAlias(alias);
    
    // Verifica la contraseña usando bcrypt
    const passwordMatch = await bcrypt.compare(pass, credential.password);

    if (!credential || !passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = credential;

    // Genera el token JWT
    const token = this.jwtService.sign({ username: result.alias, sub: result.id });
    
    // Retorna el token y los datos del usuario
    return {
      ...result,
      access_token: token,
    };
  }
}
