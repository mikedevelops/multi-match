import { AbstractTile, TileType } from "../Tile/AbstractTile";
import { Seed } from "./Seed";
import { BlueTile } from "../Tile/BlueTile";
import { RedTile } from "../Tile/RedTile";

export class TileProvider {
  private getRandomTile(): AbstractTile {
    const types = (Object.keys(TileType)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown) as TileType[keyof TileType][];
    const type = types[Math.floor(Math.random() * types.length)];

    // TODO: fix these types...
    // @ts-ignore
    switch (type) {
      // @ts-ignore
      case TileType.BLUE:
        return new BlueTile();
      // @ts-ignore
      case TileType.RED:
        return new RedTile();
    }

    throw new Error(`Could not provide Tile with type ${type}`);
  }

  public generateSeed(length: number): Seed {
    const seed = new Seed();

    for (let i = 0; i < length; i++) {
      seed.enqueue(this.getRandomTile());
    }

    return seed;
  }
}
