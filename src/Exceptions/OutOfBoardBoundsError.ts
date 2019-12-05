export class OutOfBoardBoundsError extends Error {
  constructor() {
    super("Out of bounds");

    // TS workaround https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, OutOfBoardBoundsError.prototype);
  }
}
