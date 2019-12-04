import { AbstractRenderer } from "./AbstractRenderer";
import { Column } from "../Column/Column";
import { TileRenderer } from "./TileRenderer";
import * as PIXI from "pixi.js";

export class ColumnRenderer extends AbstractRenderer {
  constructor(private tileRenderer: TileRenderer) {
    super();
  }

  public drawColumn(parent: PIXI.Container, column: Column): void {
    const container = new PIXI.Container();
    const debug = new PIXI.Graphics();
    const tiles = column.getTiles();
    const size = AbstractRenderer.getUnitFromVector(column.getSize());

    parent.addChild(container);
    container.addChild(debug);
    container.width = size.x;
    container.height = size.y;
    container.x = AbstractRenderer.getUnit(column.getOrder());

    debug.lineStyle(1, 0xff0000);
    debug.drawRect(0, 0, size.x, size.y);
    debug.endFill();

    tiles.forEach(tile => {
      this.tileRenderer.drawTile(container, tile);
    });
  }
}
