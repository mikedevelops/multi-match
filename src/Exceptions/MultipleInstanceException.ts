export class MultipleInstanceException extends Error {
  constructor(instance: string) {
    super(`Attempted to create more than 1 instance of ${instance}`);

    // TS workaround https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, MultipleInstanceException.prototype);
  }
}
