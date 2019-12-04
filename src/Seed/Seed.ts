import { AbstractTile } from "../Tile/AbstractTile";
import { EmptySeedException } from "../Exceptions/EmptySeedException";

export class Seed {
  constructor(private tiles: AbstractTile[] = []) {}

  public dequeue(): AbstractTile {
    const tile = this.tiles.shift();

    if (tile === undefined) {
      throw new EmptySeedException();
    }

    return tile;
  }

  public enqueue(tile: AbstractTile): void {
    this.tiles.push(tile);
  }
}
