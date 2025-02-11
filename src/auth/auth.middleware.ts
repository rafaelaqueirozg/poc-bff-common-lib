import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const apiKey = process.env.API_KEY;

    if (apiKey) {
      req.headers['x-api-key'] = apiKey;
    }

    next();
  }
}
