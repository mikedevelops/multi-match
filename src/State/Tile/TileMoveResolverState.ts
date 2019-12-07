import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { StateWithEnter } from "../StateWithEnter";
import { StateWithLeave } from "../StateWithLeave";
import { WaitingForReconciliationState } from "./WaitingForReconciliationState";
import { TileReconcilingState } from "./TileReconcilingState";

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

  private canReconcile(): boolean {
    return this.tile.getBoard().canReconcile();
  }

  update(): State | null {
    if (!this.released) {
      return null;
    }

    if (!this.canReconcile()) {
      return new WaitingForReconciliationState(this.tile);
    }

    return new TileReconcilingState(this.tile);
  }
}
