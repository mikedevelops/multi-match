import { AbstractTile, TileType } from "./AbstractTile";

export class BlueTile extends AbstractTile {
  getSprite(): string {
    return "B";
  }

  getType(): TileType {
    return TileType.BLUE;
  }
}
