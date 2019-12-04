import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { Vector2 } from "../../Vector/Vector2";
import { AbstractRenderer } from "../../Renderer/AbstractRenderer";
import { application, DEFAULT_LERP_SPEED } from "../../index";
import { TileIdleState } from "./TileIdleState";

export const S_TILE_RESET_MOVE = "S_TILE_RESET_MOVE";

export class TileResetMoveState implements State {
  private targetPosition: Vector2;

  constructor(private tile: AbstractTile) {
    this.targetPosition = AbstractRenderer.getUnitFromVector(
      tile.getPosition()
    );
  }

  getName(): string {
    return S_TILE_RESET_MOVE;
  }

  update(): State | null {
    const position = this.tile.getSpritePosition();
    const nextPosition = Vector2.lerpUntil(
      position,
      this.targetPosition,
      application.ticker.deltaTime * DEFAULT_LERP_SPEED
    );

    if (Vector2.equals(position, nextPosition)) {
      return new TileIdleState(this.tile);
    }

    this.tile.setSpritePosition(nextPosition);

    return null;
  }
}
