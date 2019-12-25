import { Board } from "../Board/Board";
import { AbstractTile } from "../Tile/AbstractTile";
import { Match } from "./Match";
import { BoardWalker } from "./BoardWalker";
import { Vector2 } from "../Vector/Vector2";

export class Matcher {
  private branches: AbstractTile[] = [];

  public solve(source: AbstractTile): Match {
    // TODO: Retry the "branch" approach, each tile spawns n branches (that we make sure have not already had a branch
    // starting on this tile and in this direction), then walk a branch and remove. Make sure we verify that a branch
    // is a valid "match" _before_ we spawn new branches
    const match = new Match(source);
    const walker = new BoardWalker();

    walker.walk(match, source);

    return match;
  }

  private walkTest(source: AbstractTile, match: Match): void {
    const up = this.walkInDirection(Vector2.up());
    const left = this.walkInDirection(Vector2.left());
    const right = this.walkInDirection(Vector2.right());
    const down = this.walkInDirection(Vector2.down());

    left(match, source);
    right(match, source);
    up(match, source);
    down(match, source);
  }

  private walkInDirection(
    direction: Vector2
  ): (match: Match, tile: AbstractTile) => Match {
    return (match: Match, tile: AbstractTile): Match => {
      const tempMatch = new Match(tile);
      const group = [];

      while ((tile = this.walk(tile, direction)) !== null) {
        tempMatch.addTile(tile);
      }

      if (!tempMatch.isValid()) {
        return match;
      }

      tempMatch.getFullMatch().forEach(matchedTile => {
        if (!match.hasWalked(matchedTile)) this.branches.push(matchedTile);
      });
      match.merge(tempMatch);

      return match;
    };
  }

  private walk(tile: AbstractTile, direction: Vector2): AbstractTile | null {
    const position = Vector2.add(tile.position, direction);
    const next = tile.board.getTileAt(position);

    if (next === null || next.getType() !== tile.getType()) {
      return null;
    }

    return next;
  }
}
