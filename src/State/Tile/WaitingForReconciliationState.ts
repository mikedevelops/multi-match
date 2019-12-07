import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { TileReconcilingState } from "./TileReconcilingState";

export const S_WAITING_FOR_RECONCILIATION = "S_WAITING_FOR_RECONCILIATION";

export class WaitingForReconciliationState implements State {
  constructor(private tile: AbstractTile) {}

  getName(): string {
    return S_WAITING_FOR_RECONCILIATION;
  }

  update(): State | null {
    if (this.tile.getBoard().canReconcile()) {
      return new TileReconcilingState(this.tile);
    }

    return null;
  }
}
