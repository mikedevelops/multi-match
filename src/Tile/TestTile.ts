import { AbstractTile, TileType } from "./AbstractTile";
import * as PIXI from "pixi.js";
import { loader } from "../index";

export class TestTile extends AbstractTile {
  getType(): TileType {
    return TileType.BLUE;
  }

  getTexture(): PIXI.RenderTexture {
    return loader.resources.tiles.spritesheet.textures["tiles 0.aseprite"];
  }
}
