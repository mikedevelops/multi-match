import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { Vector2 } from "../../Vector/Vector2";
import { AbstractRenderer } from "../../Renderer/AbstractRenderer";
import { application, DEFAULT_LERP_SPEED } from "../../index";
import { TileIdleState } from "./TileIdleState";
import { StateWithEnter } from "../StateWithEnter";

export const S_TILE_RESET_MOVE = "S_TILE_RESET_MOVE";

export class TileResetMoveState implements StateWithEnter {
  private readonly targetWorldPosition: Vector2;

  constructor(private tile: AbstractTile) {
    this.targetWorldPosition = AbstractRenderer.getUnitFromVector(
      new Vector2(tile.getColumnPosition().x, tile.getHomePosition().y)
    );
  }

  enter(): void {
    const linkedTile = this.tile.getLinkedTile();
    this.tile.setBoardPosition(this.tile.getHomePosition());

    if (linkedTile === null) {
      return;
    }

    this.tile.getBoard().switchTiles(this.tile, linkedTile);
    linkedTile.getStateManager().setState(new TileResetMoveState(linkedTile));
  }

  getName(): string {
    return S_TILE_RESET_MOVE;
  }

  update(): State | null {
    const position = this.tile.getSpritePosition();
    const nextPosition = Vector2.lerpUntil(
      position,
      this.targetWorldPosition,
      application.ticker.deltaTime * DEFAULT_LERP_SPEED
    );

    if (Vector2.equals(position, nextPosition)) {
      return new TileIdleState(this.tile);
    }

    this.tile.setSpritePosition(nextPosition);

    return null;
  }
}
