import { State } from "../State";
import { StateWithLeave } from "../StateWithLeave";
import { StateWithEnter } from "../StateWithEnter";
import { Board } from "../../Board/Board";
import * as PIXI from "pixi.js";
import { SwitchTileState } from "./SwitchTileState";
import { AbstractTile } from "../../Tile/AbstractTile";
import { RUNTIME_MODE } from "../../index";
import { RuntimeMode } from "../../Runtime/Runtime";

export const S_BOARD_IDLE = "S_BOARD_IDLE";

export class BoardIdleState implements StateWithEnter, StateWithLeave {
  private readonly boundSwitchTile: (
    ev: PIXI.interaction.InteractionEvent
  ) => void;
  private readonly boundGrab: (ev: PIXI.interaction.InteractionEvent) => void;
  private grabbedTile: AbstractTile | null = null;

  constructor(private board: Board) {
    this.boundGrab = this.grab.bind(this);
    this.boundSwitchTile = this.switchTile.bind(this);
  }

  private grab(ev: PIXI.interaction.InteractionEvent): void {
    // FIXME: this type
    // @ts-ignore
    if (ev.data.originalEvent.button !== 0) {
      return;
    }

    const tile = this.board.getTileByInstanceName(ev.target.name);

    if (tile === null) {
      return;
    }

    this.grabbedTile = tile;
  }

  private switchTile(ev: PIXI.interaction.InteractionEvent): void {
    // FIXME: this type
    // @ts-ignore
    if (ev.data.originalEvent.button !== 2) {
      return;
    }

    ev.data.originalEvent.preventDefault();
    this.board.switchTileType(this.board.getTileByInstanceName(ev.target.name));
  }

  enter(): void {
    this.board.sprite.addListener("pointerdown", this.boundGrab);

    if (RUNTIME_MODE === RuntimeMode.Debug) {
      this.board.sprite.addListener("pointerdown", this.boundSwitchTile);
    }
  }

  leave(): void {
    this.board.sprite.removeListener("pointerdown", this.boundGrab);
    this.board.sprite.removeListener("pointerdown", this.boundSwitchTile);
  }

  getName(): string {
    return S_BOARD_IDLE;
  }

  update(): State | null {
    if (this.grabbedTile !== null) {
      return new SwitchTileState(this.grabbedTile);
    }

    return null;
  }
}
