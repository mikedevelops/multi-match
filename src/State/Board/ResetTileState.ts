import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { AbstractTile } from "../../Tile/AbstractTile";
import { AbstractRenderer } from "../../Renderer/AbstractRenderer";
import { Vector2 } from "../../Vector/Vector2";
import { BoardIdleState } from "./BoardIdleState";
import { application, DEFAULT_LERP_SPEED } from "../../index";

const S_RESET_TILE = "S_RESET_TILE";

export class ResetTileState implements StateWithEnter {
  private targetPosition: Vector2;

  constructor(private tile: AbstractTile) {
    this.targetPosition = AbstractRenderer.getUnitFromVector(tile.homePosition);
  }

  enter(): void {
    this.tile.position = this.tile.homePosition;

    if (this.tile.linkedTile !== null) {
      this.tile.linkedTile.position = this.tile.linkedTile.homePosition;
    }
  }

  getName(): string {
    return S_RESET_TILE;
  }

  update(): State | null {
    const primaryMoveComplete = this.tile.moveTile(
      this.tile, 
      this.tile.homePosition.toWorldUnit()
    );

    if (this.tile.linkedTile === null && primaryMoveComplete) {
      return new BoardIdleState(this.tile.board);
    }

    if (this.tile.linkedTile === null) {
      return null;
    }

    const linkedMoveComplete = this.tile.linkedTile.moveTile(
      this.tile.linkedTile,
      this.tile.linkedTile.homePosition.toWorldUnit()
    );

    if (primaryMoveComplete && linkedMoveComplete) {
      return new BoardIdleState(this.tile.board);
    }

    return null;
  }
}
