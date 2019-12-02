import { Column } from "../Column/Column";
import { Vector2 } from "../Vector/Vector2";
import { Seed } from "../Seed/Seed";
import { AbstractTile } from "../Tile/AbstractTile";

export class Board {
  private columns: Column[] = [];

  constructor(private size: Vector2 = new Vector2(5, 5)) {
    // Build columns
    Vector2.fromTo(Vector2.zero(), size, vector => {
      try {
        this.getColumn(vector.y);
      } catch (e) {
        this.columns[vector.y] = new Column();
      }
    });
  }

  public fill(seed: Seed): void {
    Vector2.fromTo(Vector2.zero(), this.size, vector => {
      const tile = seed.dequeue();

      tile.setPosition(vector);
      this.getColumn(vector.y).push(tile);
    });
  }

  private getColumn(y: number): Column {
    if (this.columns[y] === undefined) {
      throw new Error("Column " + y + " does not exist");
    }

    return this.columns[y];
  }

  public getLength(): number {
    // +1 here because size param is not zero indexed
    return (this.size.x + 1) * (this.size.y + 1);
  }

  public print(): string {
    let output = "";
    let row = 0;

    Vector2.fromTo(Vector2.zero(), this.size, vector => {
      if (vector.y !== row) {
        output += "\n";
        row = vector.y;
      }

      output += ` ${this.getTileAt(vector).getSprite()} `;
    });

    return output;
  }

  private getTileAt(vector: Vector2): AbstractTile {
    return this.getColumn(vector.y).getTileAt(vector.x);
  }
}
