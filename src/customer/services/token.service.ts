import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";


@Injectable()
export class TokenService{

    constructor(private httpService:HttpService){}

    async customerVerification(token:string)
    {
        try {
            const response = await lastValueFrom(
              this.httpService.post(
                'http://localhost:3000/auth/verifyToken', 
                {}, // empty body for POST request
                {
                  headers: {
                    Authorization: `Bearer ${token}` // replace with your token
                  }
                }
              )
            );
            
            console.log('The decoded Token user object received from SNB is :', response.data);
            return response.data; // Return the response data to the caller
          } catch (error) {
            console.error('Error:', error.message);
            throw new HttpException('Verification failed', HttpStatus.UNAUTHORIZED);
          }
    }
}