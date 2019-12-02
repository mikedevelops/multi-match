export class Vector2 {
  constructor(public x = 0, public y = 0) {}

  public static fromTo(
    start: Vector2,
    end: Vector2,
    next: (vector: Vector2) => void
  ): void {
    for (let y = start.y; y <= end.y; y++) {
      for (let x = start.x; x <= end.x; x++) {
        next(new Vector2(x, y));
      }
    }
  }

  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public toString(): string {
    return `${this.x}:${this.y}`;
  }
}
