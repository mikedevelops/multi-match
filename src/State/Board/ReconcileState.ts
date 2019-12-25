import { Match } from "../../Match/Match";
import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { QueueTilesState } from "./QueueTilesState";
import { Board } from "../../Board/Board";

const S_RECONCILE = "S_RECONCILE";

export class ReconcileState implements StateWithEnter {
  private reconciled = false;

  constructor(private board: Board, private match: Match) {}

  enter(): void {
    this.board.reconcile(this.match).then(() => (this.reconciled = true));
  }

  getName(): string {
    return S_RECONCILE;
  }

  update(): State | null {
    if (this.reconciled) {
      return new QueueTilesState(this.board, this.match);
    }

    return null;
  }
}
