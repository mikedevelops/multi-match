import { Vector2 } from "../Vector/Vector2";
import { StateManager } from "../State/StateManager";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { Board } from "../Board/Board";

export enum TileType {
  BLUE
}

export abstract class AbstractTile {
  protected position: Vector2 = Vector2.zero();
  protected seedIndex: number = -1;
  protected visible = false;
  protected sprite: PIXI.Sprite;
  protected board: Board;

  protected readonly size = new Vector2(1, 1);

  constructor(protected stateManager: StateManager) {}

  public getBoard(): Board {
    return this.board;
  }

  public setBoard(board: Board): void {
    this.board = board;
  }

  public update(): void {
    this.stateManager.update();
    this.updateTexture();
  }

  public getStateManager(): StateManager {
    return this.stateManager;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public setVisible(visible: boolean): void {
    this.visible = visible;
  }

  public getPosition(): Vector2 {
    return this.position;
  }

  getSpritePosition(): Vector2 {
    return new Vector2(this.sprite.x, this.sprite.y);
  }

  setSpritePosition(position: Vector2): void {
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  public setSeedIndex(seedIndex: number): void {
    this.seedIndex = seedIndex;
  }

  public getSize(): Vector2 {
    return this.size;
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
    sprite.width = size.x;
    sprite.height = size.y;
    sprite.x = position.x;
    sprite.y = position.y;

    this.sprite = sprite;
  }

  private updateTexture(): void {
    this.sprite.texture = this.getTexture();
  }

  public abstract getType(): TileType;
  public abstract getTexture(): PIXI.RenderTexture;
}
