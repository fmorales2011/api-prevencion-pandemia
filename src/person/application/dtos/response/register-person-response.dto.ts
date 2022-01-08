export class RegisterPersonResponse {
    constructor(
      public id: number, 
      public readonly name: string, 
      public readonly lastName: string,
      public readonly dni: string
    ) {}
}