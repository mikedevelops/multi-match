import { AbstractTile, TileType } from "./AbstractTile";
import { loader } from "../index";

export class GunkanTile extends AbstractTile {
  getTexture(): PIXI.RenderTexture {
    return loader.resources.tiles.spritesheet.textures["tiles 2.aseprite"];
  }

  getType(): TileType {
    return TileType.Gunkan;
  }
}
