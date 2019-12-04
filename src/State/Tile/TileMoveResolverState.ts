import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { StateWithEnter } from "../StateWithEnter";
import { TileResetMoveState } from "./TileResetMoveState";
import { StateWithLeave } from "../StateWithLeave";

export const S_TILE_MOVE_RESOLVE = "S_TILE_MOVE_RESOLVE";

export class TileMoveResolverState implements StateWithEnter, StateWithLeave {
  private released = false;
  private handleReleaseBound: () => void;

  constructor(private tile: AbstractTile) {
    this.handleReleaseBound = this.handleRelease.bind(this);
  }

  enter(): void {
    // Detect pointerup anywhere on the page here as we may have moved the
    // pointer outside of the range of movement for the tile
    window.addEventListener("mouseup", this.handleReleaseBound);
  }

  leave(): void {
    window.removeEventListener("mouseup", this.handleReleaseBound);
  }

  private handleRelease() {
    this.released = true;
  }

  getName(): string {
    return S_TILE_MOVE_RESOLVE;
  }

  update(): State | null {
    if (!this.released) {
      return null;
    }

    if (!this.isValidMove()) {
      return new TileResetMoveState(this.tile);
    }

    return null;
  }

  private isValidMove(): boolean {
    return false;
  }
}
