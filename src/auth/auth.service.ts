import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly authRepo: Repository<UserEntity>) { }
    

    async signUp(payload) {
        
    }
}
