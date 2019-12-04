import { Board } from "../../src/Board/Board";
import { Vector2 } from "../../src/Vector/Vector2";
import { TileProvider } from "../../src/Seed/TileProvider";

describe("Board", () => {
  let tileProvider: TileProvider;

  beforeEach(() => {
    tileProvider = new TileProvider();
  });

  describe("fill", () => {
    test("Should fill the board with a seed", () => {
      const board = new Board(new Vector2(20, 20));
      const seed = tileProvider.generateSeed(board.getLength());

      board.fill(seed);
    });
  });
});
