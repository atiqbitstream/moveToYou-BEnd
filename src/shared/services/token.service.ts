import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TokenService {
  constructor(private httpService: HttpService) {}

  async customerVerification(token: string) {
    console.log('===== MTUB Token Verification START =====');
    console.log('Recevied Token: ', token);
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'http://localhost:3000/auth/verifyToken',
          {}, // empty body for POST request
          {
            headers: {
              Authorization: `Bearer ${token}`, // replace with your token
            },
            timeout: 5000,
          },
        ),
      );

      console.log('=== MTUB Token Verification Response =====');
      console.log('Verification Response: ', response.data);

      if (!response.data || !response.data.id) {
        console.error('INVALID VERIFICATION RESPONSE');
        throw new HttpException('Verification failed', HttpStatus.UNAUTHORIZED);
      }

      return response.data; // Return the response data to the caller
    } catch (error) {
      console.error('===== MTUB Verification FAILED =====');
      console.error('Verification Error: ', {
        name: error.name,
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
      });

      throw new HttpException(
        'Token Verification Failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
