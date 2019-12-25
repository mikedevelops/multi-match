import { AbstractTile } from "../Tile/AbstractTile";

export class Match {
  private tiles: AbstractTile[] = [];
  private walked: AbstractTile[] = [];

  constructor(public source: AbstractTile) {}

  public merge(match: Match): void {
    match.getFullMatch().forEach(t => this.addTile(t));
  }

  public addTile(tile: AbstractTile): void {
    // TODO: Feels like I'm handling a bug here instead of fixing it...
    if (tile === this.source) {
      return;
    }

    // Throw away duplicate tiles when matching
    if (this.tiles.indexOf(tile) !== -1) {
      return;
    }

    this.tiles.push(tile);
  }

  public getTiles(): AbstractTile[] {
    return this.tiles;
  }

  /**
   * Get all tiles including source
   */
  public getFullMatch(): AbstractTile[] {
    const tiles = [this.source, ...this.tiles];

    return tiles.sort((a, b) => {
      const ap = a.position;
      const bp = b.position;

      if (bp.y === ap.y) {
        return bp.x > ap.y ? 1 : -1;
      }

      return bp.y > ap.y ? 1 : -1;
    });
  }

  public getSource(): AbstractTile {
    return this.source;
  }

  public isValid(): boolean {
    return this.tiles.length >= 2;
  }

  public addWalked(tile: AbstractTile): void {
    this.walked.push(tile);
  }

  public hasWalked(tile: AbstractTile): boolean {
    return this.walked.indexOf(tile) !== -1;
  }

  public contains(tile: AbstractTile): boolean {
    return this.tiles.indexOf(tile) !== -1;
  }
}
