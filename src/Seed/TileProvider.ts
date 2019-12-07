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

  private createTileFromSeedId(id: string): AbstractTile {
    switch (id) {
      case "G":
        return createTile(TileType.Gunkan);
      case "M":
        return createTile(TileType.Makizushi);
      case "N":
        return createTile(TileType.Nigiri);
      default:
        throw new Error(`Could not get tile from seed ID ${id}`);
    }
  }

  public generateSeed(length: number, seedString: string | null = null): Seed {
    const seed = new Seed();

    if (seedString !== null) {
      seedString.split("").forEach((tileSeedId, index) => {
        const tile = this.createTileFromSeedId(tileSeedId);

        tile.setSeedIndex(index);
        seed.enqueue(tile);
      });
    }

    if (seed.getCount() >= length) {
      return seed;
    }

    const remaining = length - seed.getCount();

    for (let i = 0; i < remaining; i++) {
      const tile = this.getRandomTile();

      tile.setSeedIndex(i);
      seed.enqueue(tile);
    }

    return seed;
  }
}
