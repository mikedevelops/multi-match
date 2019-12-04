import { AbstractTile, TileType } from "../Tile/AbstractTile";
import { Seed } from "./Seed";
import { createTile } from "../Factory/TileFactory";

export class TileProvider {
  private getRandomTile(): AbstractTile {
    const types = (Object.keys(TileType)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown) as TileType[keyof TileType][];
    const type = types[Math.floor(Math.random() * types.length)];

    // TODO: fix these enum types
    // @ts-ignore
    return createTile(type);
  }

  public generateSeed(length: number): Seed {
    const seed = new Seed();

    for (let i = 0; i < length; i++) {
      const tile = this.getRandomTile();

      tile.setSeedIndex(i);
      seed.enqueue(tile);
    }

    return seed;
  }
}
