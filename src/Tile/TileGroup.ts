import { AbstractTile } from "./AbstractTile";

export class TileGroup {
  private tiles: Map<string, AbstractTile> = new Map();

  public addUniqueTile(tile: AbstractTile): void {
    if (this.tiles.has(tile.position.toString())) {
      return;
    }

    this.tiles.set(tile.position.toString(), tile);
  }

  public getTiles(): Iterable<AbstractTile> {
    return this.tiles.values();
  }
}

