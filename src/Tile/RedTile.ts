import { AbstractTile, TileType } from "./AbstractTile";

export class RedTile extends AbstractTile {
  getSprite(): string {
    return "R";
  }

  getType(): TileType {
    return TileType.RED;
  }
}
