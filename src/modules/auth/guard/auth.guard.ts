import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
 
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
   try {

   if(process.env.ENV === 'development') {
    return true;
   }

   const request = context.switchToHttp().getRequest();

   const token = this.extractTokenFromHeader(request);
   
   if (!token ) {
    throw new UnauthorizedException('Token não encontrado');
   }
   
    const payload = await this.jwtService.verifyAsync(token);
    request['user'] = payload;

   } catch (error) {
    console.log('error', error);
    throw new UnauthorizedException( error.message || 'Falha ao verificar o token');
   }
   return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined  {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}



