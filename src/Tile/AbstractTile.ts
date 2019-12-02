import { Vector2 } from "../Vector/Vector2";

export enum TileType {
  RED,
  BLUE
}

export abstract class AbstractTile {
  protected position: Vector2 = Vector2.zero();

  public getPosition(): Vector2 {
    return this.position;
  }

  public setPosition(position: Vector2): void {
    this.position = position;
  }

  public abstract getSprite(): string;
  public abstract getType(): TileType;
}
