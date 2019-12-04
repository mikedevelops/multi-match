import { Column } from "../Column/Column";
import { Vector2 } from "../Vector/Vector2";
import { Seed } from "../Seed/Seed";
import { AbstractTile } from "../Tile/AbstractTile";
import { EmptySeedException } from "../Exceptions/EmptySeedException";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { application } from "../index";

export class Board {
  private columns: Column[] = [];
  private sprite: PIXI.Sprite;
  private bounds: Vector2 = Vector2.zero();

  constructor(private size: Vector2) {
    for (let c = 0; c < this.size.x; c++) {
      this.columns.push(new Column(new Vector2(1, size.y), c));
    }
  }

  public updateBounds(): void {
    const bounds = this.sprite.getBounds();
    this.bounds = new Vector2(bounds.left, bounds.top);
  }

  public getBounds(): Vector2 {
    return this.bounds;
  }

  public start(): void {
    this.columns.forEach(column => column.start());
  }

  public update(): void {
    this.columns.forEach(column => column.update());
  }

  public getSize(): Vector2 {
    return this.size;
  }

  public fill(seed: Seed): void {
    this.columns.forEach(column => {
      while (!column.isFull()) {
        try {
          const tile = seed.dequeue();

          tile.setVisible(true);
          column.addTile(tile);
        } catch (error) {
          if (!(error instanceof EmptySeedException)) {
            throw error;
          }

          break;
        }
      }
    });
  }

  private getColumn(y: number): Column {
    if (this.columns[y] === undefined) {
      throw new Error("Column " + y + " does not exist");
    }

    return this.columns[y];
  }

  public getLength(): number {
    // +1 here because size param is not zero indexed
    return (this.size.x + 1) * (this.size.y + 1);
  }

  private getTileAt(vector: Vector2): AbstractTile {
    return this.getColumn(vector.y).getTileAt(vector.x);
  }

  public getColumns(): Column[] {
    return this.columns;
  }

  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  public draw(): void {
    const graphic = new PIXI.Graphics();
    const size = AbstractRenderer.getUnitFromVector(this.getSize());

    graphic.beginFill(0xff0000);
    graphic.drawRect(0, 0, size.x, size.y);
    graphic.endFill();

    const sprite = new PIXI.Sprite(
      application.renderer.generateTexture(
        graphic,
        PIXI.SCALE_MODES.LINEAR,
        application.renderer.resolution
      )
    );

    sprite.interactive = true;
    sprite.x = application.renderer.width / 2 - sprite.width / 2;
    sprite.y = application.renderer.height / 2 - sprite.height / 2;

    this.sprite = sprite;
  }
}
