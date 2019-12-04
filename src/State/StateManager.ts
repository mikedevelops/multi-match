import { State } from "./State";
import { isStateWithEnter } from "./StateWithEnter";
import { isStateWithLeave } from "./StateWithLeave";
import { isStateWithInput } from "./StateWithInput";
import * as PIXI from "pixi.js";

export class StateManager {
  private state: State;

  public update(): void {
    const next = this.state.update();

    if (next === null) {
      return;
    }

    this.setState(next);
  }

  public setState(state: State): void {
    if (this.state !== undefined && isStateWithLeave(this.state)) {
      this.state.leave();
    }

    if (isStateWithEnter(state)) {
      state.enter();
    }

    this.state = state;
  }

  public handleInput(ev: PIXI.interaction.InteractionEvent): void {
    if (isStateWithInput(this.state)) {
      this.state.handleInput(ev);
    }
  }

  public getState(): State {
    return this.state;
  }
}
