import { AbstractTile, TileType } from "../Tile/AbstractTile";
import { StateManager } from "../State/StateManager";
import { NigiriTile } from "../Tile/NigiriTile";
import { MakizushiTile } from "../Tile/MakizushiTile";
import { GunkanTile } from "../Tile/GunkanTile";

export const createTile = (type: TileType): AbstractTile => {
  const stateManager = new StateManager();

  switch (type) {
    case TileType.Nigiri:
      return new NigiriTile(stateManager);
    case TileType.Makizushi:
      return new MakizushiTile(stateManager);
    case TileType.Gunkan:
      return new GunkanTile(stateManager);
    default:
      throw new Error(`Cannot find tile with type ${type}`);
  }
};
