import { StateWithEnter } from "../StateWithEnter";
import { State } from "../State";
import { Vector2 } from "../../Vector/Vector2";
import { AbstractTile } from "../../Tile/AbstractTile";
import { application, DEFAULT_LERP_SPEED } from "../../index";
import { AbstractRenderer } from "../../Renderer/AbstractRenderer";

export const S_LINKED_TILE_MOVE_PREVIEW = "S_LINKED_TILE_PREVIEW";

export class LinkedTileMovePreviewState implements StateWithEnter {
  private targetPosition: Vector2;

  constructor(private direction: Vector2, private tile: AbstractTile) {
    this.targetPosition = Vector2.add(
      AbstractRenderer.getUnitFromVector(tile.getColumnPosition()),
      AbstractRenderer.getUnitFromVector(direction)
    );
  }

  enter(): void {
    this.tile.setBoardPosition(
      Vector2.add(this.tile.getBoardPosition(), this.direction)
    );
  }

  getName(): string {
    return S_LINKED_TILE_MOVE_PREVIEW;
  }

  update(): State | null {
    const spritePosition = this.tile.getSpritePosition();
    const nextPosition = Vector2.lerpUntil(
      spritePosition,
      this.targetPosition,
      application.ticker.deltaTime * DEFAULT_LERP_SPEED
    );

    this.tile.setSpritePosition(nextPosition);

    return null;
  }
}
