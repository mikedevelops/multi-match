import { State } from "../State";
import { StateWithEnter } from "../StateWithEnter";
import { Board } from "../../Board/Board";
import { Match } from "../../Match/Match";
import { AbstractTile } from "../../Tile/AbstractTile";
import { BoardWalker } from "../../Match/BoardWalker";
import { FillBoardState } from "./FillBoardState";

const S_Q_TILES = "S_Q_TILES";

export class QueueTilesState implements StateWithEnter {
  private tilesToReposition: AbstractTile[] = [];

  constructor(private board: Board, private match: Match) {}

  enter(): void {
    const walker = new BoardWalker();
    const matchedTiles = this.match.getFullMatch();

    // Determine tiles that need to reposition by taking each matched tile
    // and walk upwards, skipping reconciled tiles
    for (const start of matchedTiles) {
      const group = walker.walkAllUpwards(start);

      // Update the positions of tiles that need to reposition, then we
      // add them to a queue of tiles we'll move in the update loop
      for (const tile of group.getTiles()) {
        tile.board.setTilePosition(tile, walker.walkToRestingPosition(tile));
        this.tilesToReposition.push(tile);
      }
    }

    this.board.queueTiles(this.match);
  }

  getName(): string {
    return S_Q_TILES;
  }

  update(): State | null {
    return new FillBoardState(this.board, this.tilesToReposition);
  }
}
