export class RegisterPersonRequest {
    constructor(
      public name: string, 
      public lastName: string,
      public dni: string
  ) {}
}