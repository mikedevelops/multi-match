import { Board } from "../Board/Board";
import { Seed } from "../Seed/Seed";
import { application, tileDebugService } from "../index";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { TileMoveResolverState } from "../State/Tile/TileMoveResolverState";
import { TileIdleState } from "../State/Tile/TileIdleState";
import { Vector2 } from "../Vector/Vector2";
import { TileType } from "../Tile/AbstractTile";

export enum RuntimeMode {
  Debug,
  Production
}

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

      column.getTiles().forEach((tile, index) => {
        // useful references
        tile.setBoard(this.board);
        tile.setColumn(column);

        // Tile's position relative to the board grid
        tile.setBoardPosition(new Vector2(column.getOrder(), index));

        // Tile's rested home position, a reference to a position that we can
        // reset to if the board position has temporarily changed
        tile.setHomePosition(tile.getBoardPosition());

        // Draw tile
        tile.draw();

        // Give the state manager an ID for debugging
        tile
          .getStateManager()
          .setId(
            `${tile.getSeedIndex().toString()} ${TileType[tile.getType()]}`
          );

        // Set initial state for tiles
        tile.getStateManager().setState(new TileIdleState(tile));

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
