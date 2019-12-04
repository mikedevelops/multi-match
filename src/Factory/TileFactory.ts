import { AbstractTile, TileType } from "../Tile/AbstractTile";
import { TestTile } from "../Tile/TestTile";
import { StateManager } from "../State/StateManager";

export const createTile = (type: TileType): AbstractTile => {
  const stateManager = new StateManager();

  switch (type) {
    case TileType.BLUE:
      return new TestTile(stateManager);
  }
};
