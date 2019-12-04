export class EmptySeedException extends Error {
  constructor() {
    super("Seed is empty");

    // TS workaround https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, EmptySeedException.prototype);
  }
}
