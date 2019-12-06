import { Board } from "../Board/Board";
import { Seed } from "../Seed/Seed";
import { application } from "../index";
import * as PIXI from "pixi.js";
import { TileIdleState } from "../State/Tile/TileIdleState";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { TileMoveResolverState } from "../State/Tile/TileMoveResolverState";

export class Runtime {
  private board: Board;

  public loadBoard(board: Board, seed: Seed): void {
    this.board = board;
    this.board.fill(seed);
  }

  public start(): void {
    this.board.draw();
    this.board.updateBounds();

    // Draw columns and tiles
    this.board.getColumns().forEach(column => {
      const columnContainer = new PIXI.Container();

      // Position column
      columnContainer.x = AbstractRenderer.getUnit(column.getOrder());

      column.getTiles().forEach(tile => {
        // A useful references
        tile.setBoard(this.board);
        tile.setColumn(column);

        // Draw tile
        tile.draw();

        // Set initial state for tiles
        // tile.getStateManager().setState(new TileIdleState(tile));
        // TODO: Debug... all tiles are in a resolve state initially
        tile.getStateManager().setState(new TileMoveResolverState(tile, false));

        // Add tiles to column
        columnContainer.addChild(tile.getSprite());
      });

      this.board.getSprite().addChild(columnContainer);
    });

    // Add everything to the main stage
    application.stage.addChild(this.board.getSprite());

    this.update();
  }

  public update(): void {
    if (this.board === undefined) {
      return;
    }

    // Recursive update of everything in the board
    this.board.update();

    application.render();

    requestAnimationFrame(this.update.bind(this));
  }
}
