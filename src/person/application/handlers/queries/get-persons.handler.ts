import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetPersonsQuery } from '../../queries/get-persons.query';
import { GetPersonsDto } from '../../dtos/queries/get-persons.dto';

@QueryHandler(GetPersonsQuery)
export class GetSellersHandler implements IQueryHandler<GetPersonsQuery> {
  constructor() {}

  async execute(query: GetPersonsQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.name,
      a.lastName,
      a.dni
    FROM 
      person a;`;

    const ormPersons = await manager.query(sql);
    if (ormPersons.length <= 0) {
      return [];
    }
    const persons: GetPersonsDto[] = ormPersons.map(function (ormPerson) {
      let personDto = new GetPersonsDto();
      personDto.id = Number(ormPerson.id);
      personDto.name = ormPerson.name;
      personDto.lastName = ormPerson.lastName;
      personDto.dni = ormPerson.dni;
      return personDto;
    });
    return persons;
  }
}