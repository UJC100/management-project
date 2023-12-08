import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from 'src/dto/signUp.dto';
import { AuthService } from './auth.service';
import { MyAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}


    @Post('signUp')
    async signUp(@Body() payload: SignUpDto) {
        return await this.authService.signUp(payload)
    }

    @Post('signIn')
    async signIn(@Body() payload) {
        return await this.authService.signIn(payload)
    }

    @UseGuards(MyAuthGuard)
    @Get(':id')
    async getUser(@Param('id') id) {
        return await this.authService.getUser(id)
    }

}
