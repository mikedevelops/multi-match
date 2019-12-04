import { State } from "./State";
import * as PIXI from "pixi.js";

export const isStateWithInput = (state: State): state is StateWithInput =>
  (state as StateWithInput).handleInput !== undefined;

export interface StateWithInput extends State {
  handleInput(event: PIXI.interaction.InteractionEvent): void;
}
