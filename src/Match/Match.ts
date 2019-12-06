import { AbstractTile } from "../Tile/AbstractTile";

export class Match {
  private tiles: AbstractTile[] = [];

  constructor(private source: AbstractTile) {}

  public addTile(tile: AbstractTile): void {
    this.tiles.push(tile);
  }

  public getTiles(): AbstractTile[] {
    return this.tiles;
  }

  public getSource(): AbstractTile {
    return this.source;
  }

  public isValid(): boolean {
    return this.tiles.length >= 2;
  }
}
