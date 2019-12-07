import { AbstractTile } from "../Tile/AbstractTile";
import { Vector2 } from "../Vector/Vector2";
import { TileIdleState } from "../State/Tile/TileIdleState";

export class Column {
  private tiles: AbstractTile[] = [];

  constructor(private size: Vector2, private order: number) {}

  public start(): void {
    this.tiles.forEach(tile => {
      tile.getStateManager().setState(new TileIdleState(tile));
    });
  }

  public update(): void {
    this.tiles.forEach(tile => tile.update());
  }

  public getSize(): Vector2 {
    return this.size;
  }

  public getOrder(): number {
    return this.order;
  }

  public isFull(): boolean {
    return this.tiles.length === this.size.y;
  }

  public getTileAt(index: number): AbstractTile {
    const tile = this.tiles[index];

    if (tile === undefined) {
      throw new Error(`No Tile in Column at ${index}`);
    }

    return tile;
  }

  public getTiles(): AbstractTile[] {
    return this.tiles.reverse();
  }

  public addTile(tile: AbstractTile): void {
    tile.setPosition(new Vector2(0, this.size.y - this.tiles.length - 1));
    this.tiles.push(tile);
  }

  public addTileAt(tile: AbstractTile, index: number): void {
    if (index >= this.tiles.length) {
      throw new Error("Cannot insert a tile at an index that does not exist!");
    }

    this.tiles[index] = tile;
    tile.setColumn(this);
  }

  public removeTile(tile: AbstractTile): number {
    const index = this.tiles.indexOf(tile);

    if (index === -1) {
      throw new Error(`Cannot remove a tile that is not in the column!`);
    }

    this.tiles[index] = null;
    tile.setColumn(null);

    return index;
  }
}
