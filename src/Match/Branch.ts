import { Match } from "./Match";
import { AbstractTile } from "../Tile/AbstractTile";
import { Vector2 } from "../Vector/Vector2";

export class Branch {
  constructor(private direction: Vector2) {}

  public walk(tile: AbstractTile, match: Match): void {
    const adjacent = tile.getBoard().getAdjacentTile(tile, this.direction);

    if (adjacent === null || adjacent.getType() !== tile.getType()) {
      return;
    }

    match.addTile(adjacent);
    this.walk(adjacent, match);
  }
}
