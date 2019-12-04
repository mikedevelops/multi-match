import { BASE_UNIT } from "../index";
import { Vector2 } from "../Vector/Vector2";

export abstract class AbstractRenderer {
  static getUnit(unit: number): number {
    return unit * BASE_UNIT;
  }

  static getUnitFromVector(vector: Vector2): Vector2 {
    return new Vector2(vector.x * BASE_UNIT, vector.y * BASE_UNIT);
  }
}
