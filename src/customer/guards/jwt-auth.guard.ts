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

      console.log("jwt auth guard => http request : ", httpReq.rawHeaders)

      const token = httpReq.headers?.authorization?.split(' ')[1];

      console.log("jwt auth guard[mooToyou] => token : ", token)
      
      if (!token) {
        throw new UnauthorizedException('token is empty[mooToyuo]');
      }
      

      try{
    const result = await this.tokenService.customerVerification(token);
    console.log("THis is reuslt = > ",result )
      }catch(error){
        console.error('Error trying cusotmerverification')
      }
     

    } catch (error) {
      console.log('JwtAuthGuard, canActivate => ', error);
      throw new UnauthorizedException(error.message);
    }
  }
}
