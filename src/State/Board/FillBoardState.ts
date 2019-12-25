import { State } from "../State";
import { Vector2 } from "../../Vector/Vector2";
import { StateWithEnter } from "../StateWithEnter";
import { Board } from "../../Board/Board";
import { Match } from "../../Match/Match";
import { BoardWalker } from "../../Match/BoardWalker";
import { AbstractTile } from "../../Tile/AbstractTile";
import { CheckGroupMatchState } from "./CheckGroupMatchState";
import { DEFAULT_LERP_SPEED, application } from "../../index";

const S_FILL_BOARD = "S_FILL_BOARD";

export class FillBoardState implements StateWithEnter {
  private tilesToCheck: AbstractTile[];

  constructor(private board: Board, private tilesToMove: AbstractTile[]) {}

  enter(): void {
    this.tilesToMove = [...this.tilesToMove, ...this.board.deQueueTiles()];
    // Clone this here, as we'll pass it on to the next state
    this.tilesToCheck = [...this.tilesToMove];
  }

  getName(): string {
    return S_FILL_BOARD;
  }

  update(): State | null {
    if (this.tilesToMove.length === 0) {
      return new CheckGroupMatchState(this.board, this.tilesToCheck);
    }

    this.tilesToMove.forEach(tile => {
      const position = Vector2.fromInterface(tile.sprite.position);
      const next = Vector2.lerpUntil(
        position,
        tile.position.toWorldUnit(),
        application.ticker.deltaTime * DEFAULT_LERP_SPEED
      );

      tile.sprite.position.x = next.x;
      tile.sprite.position.y = next.y;

      if (Vector2.equals(position, next)) {
        this.tilesToMove = this.tilesToMove.filter(t => t !== tile);
      }
    });

    return null;
  }
}

