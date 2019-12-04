import { AbstractTile, TileType } from "./AbstractTile";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { application } from "../index";

export class TestTile extends AbstractTile {
  getType(): TileType {
    return TileType.BLUE;
  }

  getTexture(): PIXI.RenderTexture {
    const g = new PIXI.Graphics();
    const size = AbstractRenderer.getUnitFromVector(this.size);
    const state =
      this.getStateManager().getState() !== undefined
        ? this.getStateManager()
            .getState()
            .getName()
        : "NULL";
    const debug = new PIXI.Text(
      `s${this.getSeedIndex()}\n${state}`,
      new PIXI.TextStyle({
        fontSize: "14px"
      })
    );

    g.beginFill(0x00ff00);
    g.drawRect(0, 0, size.x, size.y);
    g.endFill();
    debug.width = size.x;
    g.addChild(debug);

    return application.renderer.generateTexture(
      g,
      PIXI.SCALE_MODES.LINEAR,
      application.renderer.resolution
    );
  }
}
