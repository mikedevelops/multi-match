import { AbstractRenderer } from "./AbstractRenderer";
import { AbstractTile } from "../Tile/AbstractTile";
import * as PIXI from "pixi.js";

export class TileRenderer extends AbstractRenderer {
  public drawTile(parent: PIXI.Container, tile: AbstractTile): void {
    // TODO: don't draw tiles that aren't visible, OR ANYTHING FOR THAT MATTER!
    // TODO: add textures because it's easier than making graphics!

    console.log(tile.isVisible());

    if (!tile.isVisible()) {
      return;
    }

    parent.addChild(tile.draw());
  }
}
