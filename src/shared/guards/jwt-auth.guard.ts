import { TokenService } from '../services/token.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private httpService:HttpService, private tokenService:TokenService) {
    
    
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('===== MTUB JWT AUTH GUARD START =====');

    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      console.log('Public Route : Bypassing Authentication');
      return true; // Allow public access
    }
    try {
      const request: Request = context.switchToHttp().getRequest();

      const token = request.headers?.authorization?.split(' ')[1];
     
      console.log('Extracted Token : ',token)

      if (!token) {
        console.error('Extracted Token: ',token);
        throw new UnauthorizedException('Token is missing.');
      }

      // Verify the token using your service
      const result = await this.tokenService.customerVerification(token);
      console.log("Here is the decoded User object from SNB => ", result);

      if (!result) {
        console.error('TOKEN VERIFICATION FAILED');
        throw new UnauthorizedException('Invalid token.');
      }


     request.user=result;
      // Allow the request to proceed
      console.log('===== MTUB JWT GUARD SUCCESSS =====')
      return true;

    } catch (error) {
        console.error('===== MTUB JWT GUARD ERROR =====');
        console.error('Guard Error: ',{
          name : error.name,
          message: error.message,
          stack: error.stack
        });

        throw new UnauthorizedException(error.message);
    }
  }
}
