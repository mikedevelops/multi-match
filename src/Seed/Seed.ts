import { AbstractTile } from "../Tile/AbstractTile";

export class Seed {
  constructor(private tiles: AbstractTile[] = []) {}

  public dequeue(): AbstractTile {
    const tile = this.tiles.shift();

    if (tile === undefined) {
      throw new Error("Seed is empty!");
    }

    return tile;
  }

  public enqueue(tile: AbstractTile): void {
    this.tiles.push(tile);
  }
}
