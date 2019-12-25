import { Match } from "./Match";
import { AbstractTile } from "../Tile/AbstractTile";
import { Vector2 } from "../Vector/Vector2";

export class Branch {
  constructor(public direction: Vector2, public tile: AbstractTile) {}

  public walk(): Match {
    const { board } = this.tile;
    const match = new Match(this.tile);
    let next = this.tile;

    while (next !== null && next.getType() === this.tile.getType()) {
      const position = Vector2.add(next.position, this.direction);

      match.addTile(next);

      if (!board.isInBounds(position)) break;

      next = board.getTileAt(position);
    }

    return match;
  }

  public walkMatchAny(match: Match): AbstractTile | null {
    const tile = this.tile.board.getTileAt(
      Vector2.add(this.tile.position, this.direction)
    );

    match.addTile(tile);

    return tile;
  }
}
