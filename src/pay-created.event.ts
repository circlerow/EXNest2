export class PayCreatedEvent {
  constructor(

    public readonly id: number,
    public readonly name: string,
    public readonly userId: number,
    public readonly email: string,
  ) { }
}
