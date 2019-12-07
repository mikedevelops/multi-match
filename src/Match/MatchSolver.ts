import { Board } from "../Board/Board";
import { AbstractTile } from "../Tile/AbstractTile";
import { Match } from "./Match";
import { BoardWalker } from "./BoardWalker";

export class MatchSolver {
  public async solve(board: Board, source: AbstractTile): Promise<Match> {
    const match = new Match(source);
    const walker = new BoardWalker(board);

    walker.walk(match);

    return match;
  }
}
