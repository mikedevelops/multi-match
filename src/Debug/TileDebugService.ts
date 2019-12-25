import { AbstractTile } from "../Tile/AbstractTile";
import * as PIXI from "pixi.js";

export class TileDebugService {
  private container: PIXI.Container = new PIXI.Container();

  public tiles: Map<AbstractTile, PIXI.Text> = new Map<
    AbstractTile,
    PIXI.Text
  >();

  constructor(private debugStage: PIXI.Container) {
    this.debugStage.addChild(this.container);
  }

  public draw(tile: AbstractTile): void {
    if (!this.tiles.has(tile)) {
      const text = new PIXI.Text(
        "",
        new PIXI.TextStyle({ fill: 0x00ff00, fontSize: "12px" })
      );

      this.container.addChild(text);
      this.tiles.set(tile, text);
    }

    const text = this.tiles.get(tile);
    const spritePosition = tile.sprite.getBounds();
    let debugText = tile.position.toString();

    debugText += `\n${tile.stateManager.getState().getName()}`;
    debugText += `\n${tile.name}`;

    text.x = spritePosition.left;
    text.y = spritePosition.top;
    text.width = tile.sprite.width;
    text.text = debugText;
  }
}
