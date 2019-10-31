export class InvalidBlockTypeError extends Error {
  /* istanbul ignore next */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}