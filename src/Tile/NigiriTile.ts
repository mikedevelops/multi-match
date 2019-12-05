import { AbstractTile, TileType } from "./AbstractTile";
import { loader } from "../index";

export class NigiriTile extends AbstractTile {
  getTexture(): PIXI.RenderTexture {
    return loader.resources.tiles.spritesheet.textures["tiles 0.aseprite"];
  }

  getType(): TileType {
    return TileType.Nigiri;
  }
}
