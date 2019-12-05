import { State } from "../State";
import { Vector2 } from "../../Vector/Vector2";
import { AbstractTile } from "../../Tile/AbstractTile";
import { AbstractRenderer } from "../../Renderer/AbstractRenderer";
import { application, DEFAULT_LERP_SPEED } from "../../index";
import { TileMoveResolverState } from "./TileMoveResolverState";
import { StateWithEnter } from "../StateWithEnter";
import { LinkedTileMovePreviewState } from "./LinkedTileMovePreviewState";
import { OutOfBoardBoundsError } from "../../Exceptions/OutOfBoardBoundsError";
import { StateWithLeave } from "../StateWithLeave";
import { TileResetMoveState } from "./TileResetMoveState";

export const S_ACTIVE_TILE_MOVE_PREVIEW = "S_ACTIVE_TILE_MOVE_PREVIEW";

/**
 * The state a tile can be in when it is being grabbed
 * and could be released to perform a move
 */
export class ActiveTileMovePreviewState
  implements StateWithEnter, StateWithLeave {
  /**
   * The target position for the grabbed tile to be in
   */
  private readonly targetPosition: Vector2;
  private readonly handleReleaseBound: () => void;
  private released = false;

  constructor(private direction: Vector2, private tile: AbstractTile) {
    this.targetPosition = Vector2.add(
      AbstractRenderer.getUnitFromVector(tile.getColumnPosition()),
      AbstractRenderer.getUnitFromVector(direction)
    );

    this.handleReleaseBound = this.handleRelease.bind(this);
  }

  handleRelease() {
    // TODO: check if tile is (n) percent committed to the move, we do not
    //  want to release/reset the active and linked tile if they are already
    //  committed to the move, the commitment should probably relate to the
    //  grab commitment that starts the preview move
    this.released = true;
  }

  enter(): void {
    window.addEventListener("mouseup", this.handleReleaseBound);

    const board = this.tile.getBoard();
    let adjacentTile;

    try {
      adjacentTile = board.getTileAt(
        Vector2.add(this.tile.getBoardPosition(), this.direction)
      );
    } catch (error) {
      if (!(error instanceof OutOfBoardBoundsError)) {
        throw error;
      }

      return;
    }

    this.tile.setLinkedTile(adjacentTile);

    // TODO: I don't know how I feel about this... it breaks the rule of a
    //  state managing it's own transition, but maybe that's not a big deal.
    //  Just means that something can be yanked out of a state without being
    //  able to understand why from looking at it's update method.
    //  A possible solution would be to introduce events, or some sort of
    //  method on the state that we can invoke
    adjacentTile
      .getStateManager()
      .setState(
        new LinkedTileMovePreviewState(
          Vector2.invert(this.direction),
          adjacentTile
        )
      );
  }

  getName(): string {
    return S_ACTIVE_TILE_MOVE_PREVIEW;
  }

  update(): State | null {
    if (this.released) {
      const linkedTile = this.tile.getLinkedTile();

      if (linkedTile !== null) {
        linkedTile
          .getStateManager()
          .setState(new TileResetMoveState(linkedTile));
      }

      return new TileResetMoveState(this.tile);
    }

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

  leave(): void {
    window.removeEventListener("mouseup", this.handleReleaseBound);
  }
}
