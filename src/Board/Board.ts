import { Column } from "../Column/Column";
import { Vector2 } from "../Vector/Vector2";
import { Seed } from "../Seed/Seed";
import { AbstractTile } from "../Tile/AbstractTile";
import { EmptySeedException } from "../Exceptions/EmptySeedException";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { application } from "../index";
import { MatchSolver } from "../Match/MatchSolver";

export class Board {
  private columns: Column[] = [];
  private sprite: PIXI.Sprite;
  private bounds: Vector2 = Vector2.zero();
  private matchSolver: MatchSolver = new MatchSolver();
  private matching: boolean;

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

  public async match(tile: AbstractTile): Promise<void> {
    this.matching = true;
    await this.matchSolver.solve(this, tile);
    this.matching = false;
  }

  public isMatching(): boolean {
    return this.matching;
  }

  private getColumn(x: number): Column | null {
    if (this.columns[x] === undefined) {
      return null;
    }

    return this.columns[x];
  }

  public getLength(): number {
    // +1 here because size param is not zero indexed
    return (this.size.x + 1) * (this.size.y + 1);
  }

  public getTileAt(vector: Vector2): AbstractTile | null {
    const column = this.getColumn(vector.x);

    if (column === null) {
      return null;
    }

    return column.getTileAt(vector.y);
  }

  public getAdjacentTile(
    tile: AbstractTile,
    direction: Vector2
  ): AbstractTile | null {
    const tilePosition = tile.getBoardPosition();
    const column = this.getColumn(tilePosition.x + direction.x);

    if (column === null) {
      return null;
    }

    return column.getTileAt(tilePosition.y);
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

    graphic.beginFill(0x422433);
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
