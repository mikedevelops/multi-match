import { AbstractTile } from "../Tile/AbstractTile";
import * as PIXI from "pixi.js";

export class TileDebugService {
  private container: PIXI.Container = new PIXI.Container();
  private tiles: Map<AbstractTile, PIXI.Text> = new Map<
    AbstractTile,
    PIXI.Text
  >();

  constructor(private debugStage: PIXI.Container) {
    this.debugStage.addChild(this.container);
  }

  public draw(tile: AbstractTile): void {
    if (!this.tiles.has(tile)) {
      const text = new PIXI.Text("", new PIXI.TextStyle({ fill: 0x00ff00 }));

      this.container.addChild(text);
      this.tiles.set(tile, text);
    }

    const text = this.tiles.get(tile);
    const position = tile.getSprite().getBounds();
    let debug = tile.getBoardPosition().toString();

    debug += `\n${tile
      .getStateManager()
      .getState()
      .getName()}`;
    debug += `\nSID: ${tile.getSeedIndex()}`;
    debug += `\nC: ${tile.getColumn().getOrder()}`;

    text.x = position.left;
    text.y = position.top;
    text.width = tile.getSprite().width;
    text.text = debug;
  }
}
