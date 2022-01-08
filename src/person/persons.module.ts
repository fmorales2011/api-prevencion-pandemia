import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsController } from './api/persons.controller';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { PersonTypeORM } from './infrastructure/persistence/typeorm/entities/person.typeorm';
import { PersonRegisteredHandler } from './application/handlers/events/person-registered.handler';
import { GetSellersHandler } from './application/handlers/queries/get-persons.handler';

export const CommandHandlers = [RegisterPersonHandler];
export const EventHandlers = [PersonRegisteredHandler];
export const QueryHandlers = [GetSellersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PersonTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [PersonsController],
  providers: [
    PersonApplicationService,
    RegisterPersonValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PersonsModule {}