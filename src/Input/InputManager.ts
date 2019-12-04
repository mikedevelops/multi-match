import { MultipleInstanceException } from "../Exceptions/MultipleInstanceException";
import * as PIXI from "pixi.js";

export class InputManager {
  public static instance: PIXI.interaction.InteractionManager;

  constructor(interactionManager: PIXI.interaction.InteractionManager) {
    if (InputManager.instance !== undefined) {
      throw new MultipleInstanceException(InputManager.name);
    }

    InputManager.instance = interactionManager;
  }
}
