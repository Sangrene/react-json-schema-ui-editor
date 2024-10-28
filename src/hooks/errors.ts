export class EmptyPropertyNameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmptyPropertyName";
  }
}
