import { Module } from '@nestjs/common';
import { AuthService } from '../../frameworks/auth/auth.service';
import { DataServiceService } from '../../frameworks/database/data_service/data_service.service';
import { HealthCheckController } from '../health_check/health_check.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, DataServiceService, AuthService],
})
export class AppModule {}
