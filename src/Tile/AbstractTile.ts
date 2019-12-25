import { Vector2 } from "../Vector/Vector2";
import { StateManager } from "../State/StateManager";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { Board } from "../Board/Board";
import { application, DEFAULT_LERP_SPEED, RUNTIME_MODE } from "../index";
import { RuntimeMode } from "../Runtime/Runtime";
import { TileIdleState } from "../State/Tile/TileIdleState";

export enum TileType {
  Nigiri,
  Makizushi,
  Gunkan,
}

// TODO: tiles should appear to be picked up, they should shrink/grow and
//  have a shadow

export abstract class AbstractTile {
  protected readonly size = new Vector2(1, 1);

  public name: string;
  public sprite: PIXI.Sprite;
  public seedIndex: number = -1;
  /**
   * The "resting" tile position in the current board, this should change if
   * the board configuration changes
   */
  public homePosition: Vector2;
  public linkedTile: AbstractTile | null = null;
  public board: Board;
  public position: Vector2 = Vector2.zero();
  public reconciled = false;

  constructor(public stateManager: StateManager) {}

  public setName(): void  {
    this.name = `${this.seedIndex}_${TileType[this.getType()]}`;
  }

  public start(): void {
    this.sprite = new PIXI.Sprite(this.getTexture());
    this.sprite.name = this.name;
    this.draw();
    this.stateManager.setState(new TileIdleState(this));
  }

  public update(): void {
    this.updateTexture();
    this.stateManager.update();
  }

  public draw(): void {
    const size = AbstractRenderer.getUnitFromVector(this.size);
    const position = AbstractRenderer.getUnitFromVector(this.position);

    this.sprite.interactive = true;
    this.sprite.width = size.x;
    this.sprite.height = size.y;
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  private updateTexture(): void {
  }
    
  public moveTile(tile: AbstractTile = this, target: Vector2): boolean {
    // TODO: this could be shortenned by ensuring the lerpUntil function
    // cannot overshoot the target vector
    const spritePosition = Vector2.fromInterface(tile.sprite);
    const nextPosition = Vector2.lerpUntil(
      spritePosition,
      target, 
      application.ticker.deltaTime * DEFAULT_LERP_SPEED
    );

    tile.sprite.position.x = nextPosition.x;
    tile.sprite.position.y = nextPosition.y;

    if (!Vector2.equals(spritePosition, nextPosition)) {
      return false;
    }

    tile.sprite.position.x = target.x;
    tile.sprite.position.y = target.y;

    return true;
  }

  public abstract getType(): TileType;
  public abstract getTexture(): PIXI.RenderTexture;
}

