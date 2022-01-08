import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './person/persons.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PersonsModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}