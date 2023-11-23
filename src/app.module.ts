import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
