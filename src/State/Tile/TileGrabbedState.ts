import { StateWithEnter } from "../StateWithEnter";
import { State } from "../State";
import { AbstractTile } from "../../Tile/AbstractTile";
import { StateWithLeave } from "../StateWithLeave";
import { ActiveTileMovePreviewState } from "./ActiveTileMovePreviewState";
import { Vector2 } from "../../Vector/Vector2";
import { TileResetMoveState } from "./TileResetMoveState";

export const S_TILE_GRABBED_STATE = "S_TILE_GRABBED_STATE";

export class TileGrabbedState implements StateWithEnter, StateWithLeave {
  private grabbed = true;
  private readonly handleReleaseBound: () => void;
  private readonly handleMovePointerBound: () => void;
  private lastPointerPositionX: number = 0;
  private pointerDeltaSum: number = 0;
  private couldMove: boolean = false;
  private cachedZIndex: number = 0;

  constructor(private tile: AbstractTile) {
    this.handleReleaseBound = this.handleRelease.bind(this);
    this.handleMovePointerBound = this.handlePointerMove.bind(this);
  }

  private handleRelease(): void {
    this.grabbed = false;
  }

  private handlePointerMove(event: PIXI.interaction.InteractionEvent): void {
    const { global } = event.data;
    const delta = global.x - this.lastPointerPositionX;

    if (this.lastPointerPositionX === 0) {
      this.lastPointerPositionX = global.x;
      return;
    }

    this.pointerDeltaSum += delta;
    this.tile.getSprite().x += delta;
    this.lastPointerPositionX = global.x;

    // If we have pulled a tile (n) percent of it's width we'll snap it over
    // to the valid position
    if (Math.abs(this.pointerDeltaSum) < this.tile.getSprite().width / 3) {
      return;
    }

    this.couldMove = true;
  }

  leave(): void {
    // Cleanup listeners
    window.removeEventListener("pointerup", this.handleReleaseBound);
    this.tile
      .getBoard()
      .getSprite()
      .removeListener("pointermove", this.handleMovePointerBound);

    this.tile.getSprite().zIndex = this.cachedZIndex;
  }

  enter(): void {
    // Detect pointerup anywhere on the page here as we may have moved the
    // pointer outside of the range of movement for the tile
    window.addEventListener("pointerup", this.handleReleaseBound);

    this.tile
      .getBoard()
      .getSprite()
      .addListener("pointermove", this.handleMovePointerBound);

    this.cachedZIndex = this.tile.getSprite().zIndex;
    // TODO: do this more sensibly
    this.tile.getSprite().zIndex = 999;
  }

  getName(): string {
    return S_TILE_GRABBED_STATE;
  }

  update(): State | null {
    if (this.couldMove) {
      return new ActiveTileMovePreviewState(
        this.pointerDeltaSum > 0 ? Vector2.right() : Vector2.left(),
        this.tile
      );
    }

    if (this.grabbed) {
      return null;
    }

    return new TileResetMoveState(this.tile);
  }
}
