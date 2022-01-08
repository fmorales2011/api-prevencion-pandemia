import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PersonRegistered } from 'src/person/domain/events/person-registered.event';

@EventsHandler(PersonRegistered)
export class PersonRegisteredHandler implements IEventHandler<PersonRegistered> {
  constructor() {}

  handle(event: PersonRegistered) {
    console.log('handle logic for Person Registered');
    console.log(event);
  }
}