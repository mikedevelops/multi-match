import { StateWithEnter } from "../StateWithEnter";
import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { TileIdleState } from "./TileIdleState";

export const S_TILE_GRABBED_STATE = "S_TILE_GRABBED_STATE";

export class TileGrabbedState implements StateWithEnter {
  private grabbed = true;

  constructor(private tile: AbstractTile) {}

  enter(): void {
    // Detect pointerup anywhere on the page here as we may have moved the
    // pointer outside of the range of movement for the tile
    window.addEventListener("mouseup", () => {
      this.grabbed = false;
    });
  }

  getName(): string {
    return S_TILE_GRABBED_STATE;
  }

  update(): State | null {
    if (this.grabbed) {
      return null;
    }

    return new TileIdleState(this.tile);
  }
}
