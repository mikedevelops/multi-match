import { AbstractTile } from "../Tile/AbstractTile";

export class Column {
  private tiles: AbstractTile[] = [];

  public push(tile: AbstractTile): void {
    this.tiles.push(tile);
  }

  public getTileAt(index: number): AbstractTile {
    const tile = this.tiles[index];

    if (tile === undefined) {
      throw new Error(`No Tile in Column at ${index}`);
    }

    return tile;
  }
}
