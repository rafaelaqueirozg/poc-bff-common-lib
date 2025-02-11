import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = (request.headers['x-api-key'] as string) || '';

    if (!apiKey) {
      throw new UnauthorizedException('API Key não fornecida.');
    }

    if (!this.authService.validateApiKey(apiKey)) {
      throw new UnauthorizedException('API Key inválida.');
    }

    return true;
  }
}
