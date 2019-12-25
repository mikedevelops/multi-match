import { StateWithEnter } from "../StateWithEnter";
import { State } from "../State";
import { Matcher } from "../../Match/Matcher";
import { ReconcileState } from "./ReconcileState";
import { AbstractTile } from "../../Tile/AbstractTile";
import { Match } from "../../Match/Match";
import { ResetTileState } from "./ResetTileState";

const S_COMMIT_MOVE = "S_COMMIT_MOVE";

export class CommitMoveState implements StateWithEnter {
  private match: Match;

  constructor(private tile: AbstractTile) {}

  getName(): string {
    return S_COMMIT_MOVE;
  }

  update(): State | null {
    if (this.match.isValid()) {
      return new ReconcileState(this.tile.board, this.match);
    }

    return new ResetTileState(this.tile);
  }

  enter(): void {
    const matcher = new Matcher();

    this.match = matcher.solve(this.tile);

    if (this.tile.linkedTile !== null) {
      const linkedMatch = matcher.solve(this.tile.linkedTile);

      if (!linkedMatch.isValid()) return;

      this.match.merge(matcher.solve(this.tile.linkedTile));
    }
  }
}

