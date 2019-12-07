import { Vector2 } from "../Vector/Vector2";
import { StateManager } from "../State/StateManager";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { Board } from "../Board/Board";
import { Column } from "../Column/Column";
import { RUNTIME_MODE, tileDebugService } from "../index";
import { RuntimeMode } from "../Runtime/Runtime";

export enum TileType {
  Nigiri,
  Makizushi,
  Gunkan
}

// TODO: tiles should appear to be picked up, they should shrink/grow and
//  have a shadow

export abstract class AbstractTile {
  protected position: Vector2 = Vector2.zero();
  protected boardPosition: Vector2;
  protected seedIndex: number = -1;
  protected sprite: PIXI.Sprite;
  protected board: Board;
  protected column: Column | null;
  protected linkedTile: AbstractTile | null = null;
  protected readonly size = new Vector2(1, 1);

  /**
   * The "resting" tile position in the current board, this should change if
   * the board configuration changes
   */
  protected homePosition: Vector2;

  constructor(protected stateManager: StateManager) {}

  public getBoard(): Board {
    return this.board;
  }

  public setBoard(board: Board): void {
    this.board = board;
  }

  public setColumn(column: Column): void {
    this.column = column;
  }

  public setLinkedTile(tile: AbstractTile): void {
    this.linkedTile = tile;
  }

  public getLinkedTile(): AbstractTile | null {
    return this.linkedTile;
  }

  public update(): void {
    this.stateManager.update();
    this.updateTexture();
  }

  public getStateManager(): StateManager {
    return this.stateManager;
  }

  /**
   * Returns the position of the tile on the board
   */
  public getBoardPosition(): Vector2 {
    return this.boardPosition;
  }

  public setBoardPosition(position: Vector2): void {
    this.boardPosition = position;
  }

  public setHomePosition(position: Vector2): void {
    this.homePosition = position;
  }

  public getHomePosition(): Vector2 {
    return this.homePosition;
  }

  /**
   * Returns the position of the tile in the column
   */
  public getColumnPosition(): Vector2 {
    return this.position;
  }

  public getSpritePosition(): Vector2 {
    return new Vector2(this.sprite.x, this.sprite.y);
  }

  public setSpritePosition(position: Vector2): void {
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  public setSeedIndex(seedIndex: number): void {
    this.seedIndex = seedIndex;
  }

  public getSeedIndex(): number {
    return this.seedIndex;
  }

  public setPosition(position: Vector2): void {
    this.position = position;
  }

  public draw(): void {
    const sprite = new PIXI.Sprite(this.getTexture());
    const size = AbstractRenderer.getUnitFromVector(this.size);
    const position = AbstractRenderer.getUnitFromVector(this.position);

    sprite.interactive = true;

    // TODO: figure out padding/margin here. We cannot simply add the values
    //  here as when they positions are reset, they will revert back to the
    //  "true" column position. Will likely need another position property
    //  like worldPosition or something
    sprite.width = size.x - 6;
    sprite.height = size.y - 6;
    sprite.x = position.x + 3;
    sprite.y = position.y + 3;

    this.sprite = sprite;
  }

  private updateTexture(): void {
    if (RUNTIME_MODE === RuntimeMode.Debug) {
      tileDebugService.draw(this);
    }
  }

  public getColumn(): Column {
    return this.column;
  }

  public abstract getType(): TileType;
  public abstract getTexture(): PIXI.RenderTexture;
}
