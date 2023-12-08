import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/dto/signUp.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity)
    private readonly authRepo: Repository<UserEntity>,
    private jwtService:JwtService) { }
    

    async signUp(payload: SignUpDto) {
        try {
             const { email, password, ...rest } = payload;
             const user = await this.authRepo.findOne({ where: { email } });
             if (user) {
               throw new HttpException(
                 `User exists already`,
                 HttpStatus.BAD_REQUEST,
               );
             }
             const hashedPassword = await bcrypt.hash(password, 12);
             const savedUser = await this.authRepo.save({
               ...rest,
               email,
               password: hashedPassword,
             });

             delete savedUser.password;
             return savedUser;
        } catch (error) {
              throw new HttpException(
                `Something went wrong`,
                HttpStatus.BAD_REQUEST,
              );
        }
       
    }

    async signIn(payload) {
        const { email, password } = payload
        const verifyUser = await this.authRepo.findOne({ where: { email } })
        
        if (!verifyUser) {
            throw new HttpException(
              `Incorrect Credentials`,
              HttpStatus.BAD_REQUEST,
            );
        }

        const verifyPassword = bcrypt.compare(verifyUser.password, password)

        if (!verifyPassword) {
            throw new HttpException(`Incorrect Credentials`, HttpStatus.BAD_REQUEST)
        }

        const user = {
            sub: verifyUser.id,
            email: verifyUser.email
        }
        const token = await this.jwtService.signAsync(user)
        return { token } 
    }
    

    async getUser(id) {
        try {
             return await this.authRepo.findOne({ where: { id } });
        } catch (error) {
            throw new UnauthorizedException()
        }
       
    }
}
