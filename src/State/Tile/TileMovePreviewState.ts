import { StateWithEnter } from "../StateWithEnter";
import { State } from "../State";
import { Vector2 } from "../../Vector/Vector2";
import { AbstractTile } from "../../Tile/AbstractTile";
import { AbstractRenderer } from "../../Renderer/AbstractRenderer";
import { application, DEFAULT_LERP_SPEED } from "../../index";
import { TileMoveResolverState } from "./TileMoveResolverState";

export const S_TILE_MOVE_PREVIEW_STATE = "S_TILE_MOVE_PREVIEW_STATE";

/**
 * The state a tile can be in when it is being grabbed
 * and could be released to perform a move
 */
export class TileMovePreviewState implements State {
  /**
   * The target position for the grabbed tile to be in
   */
  private readonly targetPosition: Vector2;

  constructor(direction: Vector2, private tile: AbstractTile) {
    this.targetPosition = Vector2.add(
      AbstractRenderer.getUnitFromVector(this.tile.getPosition()),
      AbstractRenderer.getUnitFromVector(direction)
    );
  }

  getName(): string {
    return S_TILE_MOVE_PREVIEW_STATE;
  }

  update(): State | null {
    const spritePosition = this.tile.getSpritePosition();
    const nextPosition = Vector2.lerpUntil(
      spritePosition,
      this.targetPosition,
      application.ticker.deltaTime * DEFAULT_LERP_SPEED
    );

    if (Vector2.equals(spritePosition, nextPosition)) {
      return new TileMoveResolverState(this.tile);
    }

    this.tile.setSpritePosition(nextPosition);

    return null;
  }
}
