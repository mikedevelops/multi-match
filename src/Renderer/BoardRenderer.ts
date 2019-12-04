import * as PIXI from "pixi.js";
import { AbstractRenderer } from "./AbstractRenderer";
import { Board } from "../Board/Board";
import { ColumnRenderer } from "./ColumnRenderer";
import { getApplicationHeight, getApplicationWidth } from "../index";

export class BoardRenderer extends AbstractRenderer {
  constructor(private columnRenderer: ColumnRenderer) {
    super();
  }

  public drawBoard(parent: PIXI.Container, board: Board): void {}
}
