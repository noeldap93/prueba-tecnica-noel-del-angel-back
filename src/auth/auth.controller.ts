import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Public } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    @Inject() authService:AuthService;
    
    @Public()
    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body)
    }
}
