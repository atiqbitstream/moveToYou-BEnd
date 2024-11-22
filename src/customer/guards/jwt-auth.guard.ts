import { TokenService } from './../services/token.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private httpService:HttpService, private tokenService:TokenService) {
    // console.log('AuthService instantiated with TokenService:', tokenService);
    
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true; // Allow public access
    }
    try {
      const httpReq: Request = context.switchToHttp().getRequest();

      const token = httpReq.headers?.authorization?.split(' ')[1];
      console.log("jwt auth guard[mooToyou] => token : ", token);

      if (!token) {
        throw new UnauthorizedException('Token is missing.');
      }

      // Verify the token using your service
      const result = await this.tokenService.customerVerification(token);
      console.log("Here is the decoded User object from SNB => ", result);

      if (!result) {
        throw new UnauthorizedException('Invalid token.');
      }


     httpReq.user=result;
      // Allow the request to proceed
      return true;

    } catch (error) {
      console.log('JwtAuthGuard, canActivate => ', error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
