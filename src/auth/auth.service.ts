import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly validApiKey = process.env.API_KEY;

  validateApiKey(apiKey: string): boolean {
    return apiKey === this.validApiKey;
  }
}
