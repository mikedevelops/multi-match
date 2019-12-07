import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { AbstractTile } from "../../Tile/AbstractTile";
import { Match } from "../../Match/Match";
import { TileResetMoveState } from "./TileResetMoveState";

export const S_TILE_RECONCILIATION = "S_TILE_RECONCILIATION";

export class TileReconcilingState implements StateWithEnter {
  private match: Match | null = null;

  constructor(private tile: AbstractTile) {}

  getName(): string {
    return S_TILE_RECONCILIATION;
  }

  update(): State | null {
    if (this.match === null) {
      return null;
    }

    if (this.match.isValid()) {
      throw new Error("MATCH");
      return null;
    }

    return new TileResetMoveState(this.tile);
  }

  enter(): void {
    this.tile
      .getBoard()
      .match(this.tile)
      .then(match => {
        console.log(match);
        this.match = match;
      });
  }
}
