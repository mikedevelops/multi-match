import { DEFAULT_LERP_SPEED } from "../index";

export const DEFAULT_LERP_TOLERANCE = 0.05;

export class Vector2 {
  constructor(public x = 0, public y = 0) {}

  public static fromTo(
    start: Vector2,
    end: Vector2,
    next: (vector: Vector2) => void
  ): void {
    for (let x = start.x; x <= end.x; x++) {
      for (let y = start.y; y <= end.y; y++) {
        next(new Vector2(x, y));
      }
    }
  }

  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public static right(): Vector2 {
    return new Vector2(1, 0);
  }

  public static left(): Vector2 {
    return new Vector2(-1, 0);
  }

  public toString(): string {
    return `${this.x}:${this.y}`;
  }

  public static add(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  public static subtract(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  public static multiply(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x * b.x, a.y * b.y);
  }

  public static multiplyInt(vector: Vector2, int: number): Vector2 {
    return new Vector2(vector.x * int, vector.y * int);
  }

  public static addInt(vector: Vector2, int: number): Vector2 {
    return new Vector2(vector.x + int, vector.y + int);
  }

  public static lerp(start: Vector2, end: Vector2, percent: number): Vector2 {
    const diff = Vector2.subtract(end, start);
    const b = Vector2.multiplyInt(diff, percent);
    return Vector2.add(start, b);
  }

  public static distance(a: Vector2, b: Vector2): number {
    const diff = Vector2.subtract(a, b);
    return Math.sqrt(diff.x * diff.x + diff.y * diff.y);
  }

  public static equals(a: Vector2, b: Vector2): boolean {
    return a.x === b.x && a.y === b.y;
  }

  /**
   * Lerp between 2 points, if the distance between the start and end positions
   * is less than the tolerance, then return the start position because we have
   * arrived
   * @param start
   * @param end
   * @param percent
   * @param tolerance
   */
  public static lerpUntil(
    start: Vector2,
    end: Vector2,
    percent: number = DEFAULT_LERP_SPEED,
    tolerance: number = DEFAULT_LERP_TOLERANCE
  ): Vector2 {
    const lerped = Vector2.lerp(start, end, percent);
    const distance = Vector2.distance(start, lerped);

    return distance < tolerance ? start : lerped;
  }

  public static invert(vector: Vector2): Vector2 {
    return new Vector2(vector.x * -1, vector.y * -1);
  }
}
