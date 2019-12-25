import { Board } from "../Board/Board";
import { AbstractTile } from "../Tile/AbstractTile";
import { Vector2 } from "../Vector/Vector2";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";

export class BoardDebugService {
  private container: PIXI.Container;
  private boardState: PIXI.Text;

  constructor(private board: Board) {}

  public start(): void {
    this.container = new PIXI.Container();

    this.sync();

    this.boardState = new PIXI.Text(
      this.board.stateManager.getState().getName(),
      new PIXI.TextStyle({ fill: 0x00ff00 })
    );
    this.boardState.x -= AbstractRenderer.getUnit(1);
    this.boardState.y -= AbstractRenderer.getUnit(1);

    this.board.sprite.addChild(this.boardState);
  }

  public sync(): void {
    this.container.removeChildren();
    this.board.sprite.removeChild(this.container);

    this.board.forEachTile((tile, position) => {
      const text = new PIXI.Text(
        "",
        new PIXI.TextStyle({ fill: 0x00ff00, fontSize: "14px" })
      );
      const textPosition = position.toWorldUnit();

      this.print(tile, position, text);

      text.position.x = textPosition.x;
      text.position.y = textPosition.y;

      this.container.addChild(text);
    }, true);

    this.board.sprite.addChild(this.container);
  }

  public update(): void {
    this.boardState.text = this.board.stateManager.getState().getName();
  }

  public print(
    tile: AbstractTile | null,
    position: Vector2,
    text: PIXI.Text
  ): void {
    let info = "";

    if (tile === null) {
      text.text += "NULL";
      text.text += `\n${position.toString()}`;
      return;
    }

    info += `${tile.name}`;
    info += `\n${tile.position.toString()}`;

    text.text = info;
  }
}
