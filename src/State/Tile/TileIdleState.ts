import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { AbstractTile } from "../../Tile/AbstractTile";

export const S_TILE_IDLE = "S_TITLE_IDLE";

export class TileIdleState implements StateWithEnter {
  private grabbed = false;

  constructor(private tile: AbstractTile) {}

  getName(): string {
    return S_TILE_IDLE;
  }

  update(): State | null {
    return null;
  }

  enter(): void {

  }
}
