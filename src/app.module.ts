import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { RiderModule } from './rider/rider.module';

@Module({
  imports: [CustomerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal:true,
        envFilePath:['.local.env']
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        entities :[__dirname+'/**/*.entity{.ts,.js}']
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    RiderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
