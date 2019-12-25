import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { AbstractTile } from "../../Tile/AbstractTile";
import { MatchGroup } from "../../Match/MatchGroup";
import { Matcher } from "../../Match/Matcher";
import { Board } from "../../Board/Board";
import { ReconcileState } from "./ReconcileState";
import { BoardIdleState } from "./BoardIdleState";

const S_CHECK_GROUP_MATCH = "S_CHECK_GROUP_MATCH";

export class CheckGroupMatchState implements StateWithEnter {
  private group: MatchGroup = new MatchGroup();

  constructor(private board: Board, private tiles: AbstractTile[]) {}

  getName(): string {
    return S_CHECK_GROUP_MATCH;
  }

  enter(): void {
    const solver = new Matcher();

    this.tiles.forEach(tile => {
      const match = solver.solve(tile);

      if (!match.isValid()) return;

      this.group.addMatch(match);
    });
  }

  update(): State | null {
    if (this.group.hasMatches()) {
      const match = this.group.consolidate();

      return new ReconcileState(this.board, match);
    }

    return new BoardIdleState(this.board);
  }
}

