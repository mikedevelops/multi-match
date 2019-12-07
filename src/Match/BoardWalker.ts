import { Board } from "../Board/Board";
import { Match } from "./Match";
import { Vector2 } from "../Vector/Vector2";
import { Branch } from "./Branch";

export class BoardWalker {
  private branches: BoardWalker[] = [];

  constructor(private board: Board) {}

  public walk(match: Match) {
    const start = match.getSource();

    // left
    const left = new Branch(Vector2.left());

    left.walk(start, match);
  }
}
