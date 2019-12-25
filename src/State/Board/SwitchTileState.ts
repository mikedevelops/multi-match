import { StateWithEnter } from "../StateWithEnter";
import { StateWithLeave } from "../StateWithLeave";
import { AbstractTile } from "../../Tile/AbstractTile";
import { State } from "../State";
import { Vector2 } from "../../Vector/Vector2";
import * as PIXI from "pixi.js";
import { PreviewMoveState } from "./PreviewMoveState";
import { ResetTileState } from "./ResetTileState";

const S_SWITCH_TILE = "S_SWITCH_TILE";

export class SwitchTileState implements StateWithEnter, StateWithLeave {
  private readonly boundRelease: () => void;
  private readonly boundMove: () => void;

  private grabbed = true;
  private lastPointerPosition: Vector2 = Vector2.zero();
  private pointerDeltaSum: number = 0;
  private couldMove = false;
  private direction: string;

  constructor(private tile: AbstractTile) {
    this.boundRelease = this.handleRelease.bind(this);
    this.boundMove = this.handleMove.bind(this);
  }

  private handleRelease(): void {
    this.grabbed = false;
  }

  private handleMove(event: PIXI.interaction.InteractionEvent): void {
    const pointerPosition = new Vector2(
      event.data.global.x,
      event.data.global.y
    );
    const delta = Vector2.subtract(pointerPosition, this.lastPointerPosition);

    if (Vector2.equals(this.lastPointerPosition, Vector2.zero())) {
      this.lastPointerPosition = delta;
      return;
    }

    // Determine the direction we're headed in using the delta
    if (this.direction === undefined) {
      this.direction = Math.abs(delta.x) > Math.abs(delta.y) ? "x" : "y";
    }

    this.pointerDeltaSum += delta[this.direction];
    this.tile.sprite[this.direction] += delta[this.direction];
    this.lastPointerPosition = pointerPosition;

    // If we have pulled a tile (n) percent of it's width we'll snap it over
    // to the valid position
    if (Math.abs(this.pointerDeltaSum) < this.tile.sprite.width / 3) {
      return;
    }

    this.couldMove = true;
  }

  enter(): void {
    window.addEventListener("pointerup", this.boundRelease);
    this.tile.board.sprite.addListener("pointermove", this.boundMove);
  }

  leave(): void {
    window.removeEventListener("pointerup", this.boundRelease);
    this.tile.board.sprite.removeListener("pointermove", this.boundMove);
  }

  getName(): string {
    return S_SWITCH_TILE;
  }

  update(): State | null {
    if (this.couldMove) {
      return new PreviewMoveState(this.tile, this.getDirection());
    }

    if (this.grabbed) {
      return null;
    }

    return new ResetTileState(this.tile);
  }

  private getDirection(): Vector2 {
    if (this.direction === "x") {
      return this.pointerDeltaSum >= 0 ? Vector2.right() : Vector2.left();
    } else {
      return this.pointerDeltaSum >= 0 ? Vector2.down() : Vector2.up();
    }
  }
}
