import { Board } from "../Board/Board";
import { Seed } from "../Seed/Seed";
import { application, RUNTIME_MODE } from "../index";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { TileIdleState } from "../State/Tile/TileIdleState";
import { Vector2 } from "../Vector/Vector2";
import { TileType } from "../Tile/AbstractTile";

export enum RuntimeMode {
  Debug,
  Production
}

export class Runtime {
  private board: Board;
  private tick = 0;

  public loadBoard(board: Board, seed: Seed): void {
    this.board = board;
    this.board.fill(seed);
  }

  public start(): void {
    this.board.start();

    // Add everything to the main stage
    application.stage.addChild(this.board.sprite);

    this.update();
  }

  public update(): void {
    this.tick++;

    if (this.board === undefined) {
      throw new Error("no board");
    }

    // Half the FPS in debug mode to make sure the debug service
    // doesn't completely trash the runtime!
    if (RUNTIME_MODE === RuntimeMode.Debug && this.tick % 2 === 0) {
      requestAnimationFrame(this.update.bind(this));
      return;
    }

    // Recursive update of everything in the board
    this.board.update();

    // Draw everything!
    application.render();

    requestAnimationFrame(this.update.bind(this));
  }
}
