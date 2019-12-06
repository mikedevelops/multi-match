import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { StateWithEnter } from "../StateWithEnter";
import { TileResetMoveState } from "./TileResetMoveState";
import { StateWithLeave } from "../StateWithLeave";
import { Vector2 } from "../../Vector/Vector2";
import { Match } from "../../Match/Match";
import { TileIdleState } from "./TileIdleState";

export const S_TILE_MOVE_RESOLVE = "S_TILE_MOVE_RESOLVE";

export class TileMoveResolverState implements StateWithEnter, StateWithLeave {
  private released;
  private readonly handleReleaseBound: () => void;

  constructor(private tile: AbstractTile, grabbedState = true) {
    this.handleReleaseBound = this.handleRelease.bind(this);
    this.released = !grabbedState;
  }

  enter(): void {
    // Detect pointerup anywhere on the page here as we may have moved the
    // pointer outside of the range of movement for the tile
    window.addEventListener("pointerup", this.handleReleaseBound);
  }

  leave(): void {
    window.removeEventListener("pointerup", this.handleReleaseBound);
  }

  private handleRelease() {
    this.released = true;
  }

  getName(): string {
    return S_TILE_MOVE_RESOLVE;
  }

  private isValid(): boolean {
    // TODO: determine this somehow
    return false;
  }

  update(): State | null {
    if (!this.released) {
      return null;
    }

    if (!this.isValid()) {
      const linkedTile = this.tile.getLinkedTile();

      if (linkedTile !== null) {
        // TODO: Another instance of a transition state outside of a state...
        linkedTile
          .getStateManager()
          .setState(new TileResetMoveState(linkedTile));
      }

      return new TileResetMoveState(this.tile);
    }

    return null;
  }

  private buildMatch(tile: AbstractTile, match: Match): Match {
    const board = tile.getBoard();

    // left
    const left = board.getAdjacentTile(tile, Vector2.left());

    if (left !== null && left.getType() === tile.getType()) {
      match.addTile(left);
      return this.buildMatch(left, match);
    }

    return match;
  }
}
