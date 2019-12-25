import { Vector2 } from "../Vector/Vector2";
import { Seed } from "../Seed/Seed";
import { AbstractTile } from "../Tile/AbstractTile";
import * as PIXI from "pixi.js";
import { AbstractRenderer } from "../Renderer/AbstractRenderer";
import { application, RUNTIME_MODE } from "../index";
import { Match } from "../Match/Match";
import { StateManager } from "../State/StateManager";
import { RuntimeMode } from "../Runtime/Runtime";
import { CheckGroupMatchState } from "../State/Board/CheckGroupMatchState";
import { BoardDebugService } from "../Debug/BoardDebugService";
import { BoardWalker } from "../Match/BoardWalker";

const MIN_TILES_IN_MATCH = 3;

export class Board {
  private bounds: Vector2 = Vector2.zero();
  private debugService: BoardDebugService = new BoardDebugService(this);
  private seed: Seed;

  // TODO: might be better to have a system where these could be consolidated

  // Tiles in the grid indexed by serialised position
  public grid: Map<string, AbstractTile | null> = new Map();
  // Tiles in the grid indexed by the sprite name
  public tiles: Map<string, AbstractTile | null> = new Map();
  // Tiles that are queued ready to slide into their positions, indexed
  // by serialised "resting" position
  public queue: Map<string, AbstractTile | null> = new Map();

  public sprite: PIXI.Sprite;

  constructor(public size: Vector2, public stateManager: StateManager) {}

  public updateBounds(): void {
    const bounds = this.sprite.getBounds();
    this.bounds = new Vector2(bounds.left, bounds.top);
  }

  public getBounds(): Vector2 {
    return this.bounds;
  }

  public start(): void {
    this.sprite = this.createSprite();
    this.draw();
    this.forEachTile(this.bootstrapTile.bind(this));

    this.updateBounds();
    this.stateManager.setState(new CheckGroupMatchState(this, this.getTiles()));

    if (RUNTIME_MODE === RuntimeMode.Debug) {
      this.debugService.start();
    }
  }

  private bootstrapTile(tile: AbstractTile): void {
    tile.board = this;
    tile.start();
    this.sprite.addChild(tile.sprite);
  }

  public update(): void {
    this.stateManager.update();
    this.forEachTile(tile => {
      tile.update();
    });

    if (RUNTIME_MODE === RuntimeMode.Debug) {
      this.debugService.sync();
      this.debugService.update();
    }
  }

  public getSize(): Vector2 {
    return this.size;
  }

  public getArea(): number {
    return this.size.x * this.size.y;
  }

  public fill(seed: Seed): void {
    this.seed = seed;

    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        const tile = seed.dequeue();
        const position = new Vector2(x, y);

        tile.position = position;
        tile.board = this;
        tile.homePosition = position;

        this.grid.set(tile.position.toString(), tile);
        this.tiles.set(tile.name, tile);
      }
    }
  }

  public getLength(): number {
    // +1 here because size param is not zero indexed
    return (this.size.x + 1) * (this.size.y + 1);
  }

  private createSprite(): PIXI.Sprite {
    const size = AbstractRenderer.getUnitFromVector(this.getSize());
    const graphic = new PIXI.Graphics();

    graphic.beginFill(0x422433);
    graphic.drawRect(0, 0, size.x, size.y);
    graphic.endFill();

    return new PIXI.Sprite(
      application.renderer.generateTexture(
        graphic,
        PIXI.SCALE_MODES.LINEAR,
        application.renderer.resolution
      )
    );
  }

  public draw(): void {
    this.sprite.interactive = true;
    this.sprite.x = application.renderer.width / 2 - this.sprite.width / 2;
    this.sprite.y = application.renderer.height / 2 - this.sprite.height / 2;
  }

  public getStateManager(): StateManager {
    return this.stateManager;
  }

  public getTiles(): AbstractTile[] {
    return [...this.grid.values()];
  }

  public getTileByInstanceName(name: string): AbstractTile | null {
    if (!this.tiles.has(name)) {
      return null;
    }

    return this.tiles.get(name);
  }

  public getTileAt(
    position: Vector2,
    collection: Map<string, AbstractTile> = this.grid
  ): AbstractTile | null {
    if (!collection.has(position.toString())) return null;

    return collection.get(position.toString());
  }

  public isInBounds(position: Vector2): boolean {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x < this.size.x &&
      position.y < this.size.y
    );
  }

  public getMatch(tile: AbstractTile, direction: Vector2): Match {
    const match = new Match(tile);
    let neighbour = tile;
    let count = 1;

    while (neighbour !== null && neighbour.getType() === tile.getType()) {
      const position = Vector2.subtract(
        tile.position,
        Vector2.multiplyInt(direction, count)
      );

      if (!this.isInBounds(position)) {
        break;
      }

      neighbour = this.getTileAt(position);
      match.addTile(neighbour);
      count++;
    }

    return match;
  }

  public reconcile(match: Match): Promise<void> {
    return new Promise(resolve => {
      match.getFullMatch().forEach(tile => {
        tile.sprite.tint = 0xff0000;
      });

      setTimeout(() => {
        match.getFullMatch().forEach(tile => {
          this.sprite.removeChild(tile.sprite);
          this.grid.set(tile.position.toString(), null);
          this.tiles.delete(tile.name);
          tile.reconciled = true;
        });

        resolve();
      }, 1000);
    });
  }

  public forEachTile(
    cb: (tile: AbstractTile | null, position: Vector2) => void,
    includeNull = false
  ): void {
    for (const [position, tile] of this.grid.entries()) {
      if (tile === null && !includeNull) continue;

      cb(tile, Vector2.fromString(position));
    }
  }

  public setTilePosition(tile: AbstractTile, position: Vector2): void {
    if (Vector2.equals(tile.position, position)) {
      return;
    }

    // The tile in the space we are trying to occupy
    const targetPositionTile = this.grid.get(position.toString());

    if (targetPositionTile !== null && targetPositionTile !== undefined) {
      throw new Error(
        `Cannot move (${tile.position.toString()}) tile "${
          tile.name
        }" because the space (${position.toString()}) is occupied by "${
          targetPositionTile.name
        }"`
      );
    }

    // update the grid lookup
    this.grid.set(tile.position.toString(), null);
    this.grid.set(position.toString(), tile);

    tile.position = position;
  }

  /**
   * Used for when switching 2 tile positions, we cannot use setTilePosition here because
   * both tiles would be in each others way
   */
  public switchTilePosition(a: AbstractTile, b: AbstractTile): void {
    const aTarget = b.position;
    const bTarget = a.position;

    this.grid.set(aTarget.toString(), a);
    this.grid.set(bTarget.toString(), b);

    a.position = aTarget.clone();
    b.position = bTarget.clone();
  }

  public deQueueTiles(): AbstractTile[] {
    const tiles: AbstractTile[] = [];

    for (const [key, t] of this.queue.entries()) {
      tiles.push(t);
      this.queue.delete(key);
    }

    return tiles;
  }

  public queueTiles(match: Match): void {
    const walker = new BoardWalker();

    for (const tile of match.getFullMatch()) {
      const seedTile = this.seed.dequeue();
      const queuePosition = walker.walkTileQueue(tile);

      this.bootstrapTile(seedTile);

      // Set position here temporarily as it is used by the board
      // walker when walking to the resting position
      seedTile.position = queuePosition;

      const restingPosition = walker.walkToRestingPosition(seedTile);

      seedTile.position = restingPosition;
      seedTile.homePosition = restingPosition;

      const startPosition = queuePosition.clone().toWorldUnit();

      seedTile.sprite.position.x = startPosition.x;
      seedTile.sprite.position.y = startPosition.y;

      this.grid.set(restingPosition.toString(), seedTile);
      this.tiles.set(seedTile.name, seedTile);
      this.queue.set(queuePosition.toString(), seedTile);
    }
  }

  public switchTileType(tile: AbstractTile): void {
    const newTile = this.seed.dequeue();

    newTile.position = tile.position;

    this.bootstrapTile(newTile);
    this.grid.set(tile.position.toString(), newTile);
    this.tiles.set(newTile.name, newTile);
    this.sprite.removeChild(tile.sprite);
  }
}
