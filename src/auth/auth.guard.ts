import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Request} from "express"
import { request } from "http";
import { JwtConstant } from "./constant";


@Injectable()
export class MyAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = await this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const verify = await this.jwtService.verifyAsync(token, {
              secret: JwtConstant.secret,
            });

            request['user'] = verify;
        } catch (error) {
            throw new UnauthorizedException();
        }
        
        return true
}




  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}