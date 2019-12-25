import { Board } from "../Board/Board";
import { Match } from "./Match";
import { Vector2 } from "../Vector/Vector2";
import { Branch } from "./Branch";
import { AbstractTile } from "../Tile/AbstractTile";
import { TileGroup } from "../Tile/TileGroup";

export class BoardWalker {
  private branches: Branch[] = [];
  private walkedTiles: AbstractTile[] = [];

  private addBranch(branch: Branch): void {
    this.branches.push(branch);
    this.walkedTiles.push(branch.tile);
  }

  private shouldAddBranch(tile: AbstractTile): boolean {
    return this.walkedTiles.indexOf(tile) === -1;
  }

  public walk(match: Match, start: AbstractTile): void {
    // Start by creating branches in all directions for the first node
    const left = new Branch(Vector2.left(), start);
    const down = new Branch(Vector2.down(), start);
    const right = new Branch(Vector2.right(), start);
    const up = new Branch(Vector2.up(), start);

    this.addBranch(left);
    this.addBranch(down);
    this.addBranch(right);
    this.addBranch(up);

    let x = 0;

    while (this.branches.length > 0) {
      x++;

      if (x === 10000) throw new Error("STOP");

      const branch = this.branches[0];
      const branchMatch = branch.walk();

      this.branches.shift();

      if (!branchMatch.isValid()) continue;

      branchMatch.getFullMatch().forEach(t => {
        match.addTile(t);
      });

      branchMatch.getTiles().forEach(tile => {
        if (!this.shouldAddBranch(tile)) return;

        const left = new Branch(Vector2.left(), tile);
        const down = new Branch(Vector2.down(), tile);
        const right = new Branch(Vector2.right(), tile);
        const up = new Branch(Vector2.up(), tile);

        this.addBranch(left);
        this.addBranch(down);
        this.addBranch(right);
        this.addBranch(up);
      });
    }
  }

  public walkAllUpwards(start: AbstractTile): TileGroup {
    const group = new TileGroup();
    const { board } = start;
    let tile = start;
    let position = start.position;

    if (!start.reconciled) {
      group.addUniqueTile(start);
    }

    while (position.y !== 0) {
      const nextPosition = Vector2.add(position, Vector2.up());
      const next = board.getTileAt(nextPosition);

      position = nextPosition;

      // We shouldn't walk reconciled tiles
      if (next === null || next.reconciled) {
        continue;
      }

      group.addUniqueTile(next);
      tile = next;
    }

    return group;
  }

  public walkToRestingPosition(start: AbstractTile): Vector2 {
    const { board } = start;
    let position = start.position;

    // walk until we find a non-rec tile / oob
    while (position.y < board.size.y - 1) {
      const nextPosition = Vector2.add(position, Vector2.down());
      const tile = board.getTileAt(nextPosition);

      if (tile !== null && !tile.reconciled) {
        break;
      }

      position = nextPosition;
    }

    return position;
  }

  public walkTileQueue(start: AbstractTile): Vector2 {
    const { board } = start;
    let position = new Vector2(start.position.x, 0);
    let tile = start;

    while (true) {
      position = Vector2.add(position, Vector2.up());

      const nextTile = board.getTileAt(position, board.queue);

      if (nextTile === null) {
        break;
      }
    }

    return position;
  }
}
