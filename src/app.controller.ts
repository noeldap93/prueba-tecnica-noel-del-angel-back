import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getRoot() {
    return {
      version: '1.0.0',
      message: 'OK',
    };
  }
}
