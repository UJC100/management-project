import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { SignUpDto } from 'src/dto/signUp.dto';
import { AuthService } from './auth.service';
import { MyAuthGuard } from './auth.guard';
import {Response} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() payload: SignUpDto) {
    return await this.authService.signUp(payload);
  }
    
    
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() payload, @Res() res: Response) {
      const token = await this.authService.signIn(payload);
      res.cookie('Authenticated', token, {
          httpOnly: true,
          maxAge: 1 * 60 * 60 * 24
      });
      return res.send({
          success: true,
          userToken: token
      })
  }
    

  @UseGuards(MyAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id) {
    return await this.authService.getUser(id);
  }
}
