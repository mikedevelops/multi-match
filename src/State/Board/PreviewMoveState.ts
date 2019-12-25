import { StateWithEnter } from "../StateWithEnter";
import { State } from "../State";
import { Vector2 } from "../../Vector/Vector2";
import { application, DEFAULT_LERP_SPEED } from "../../index";
import { AbstractRenderer } from "../../Renderer/AbstractRenderer";
import { CommitMoveState } from "./CommitMoveState";
import { AbstractTile } from "../../Tile/AbstractTile";
import { ResetTileState } from "./ResetTileState";

const S_PREVIEW_MOVE = "S_PREVIEW_MOVE";

// TODO: switching is weird and broken, the directions are working in an odd way

export class PreviewMoveState implements StateWithEnter {
  private readonly targetPosition: Vector2;
  private readonly boundRelease: () => void;

  private released = false;

  constructor(private tile: AbstractTile, private direction: Vector2) {
    this.boundRelease = this.handleRelease.bind(this); 
    this.targetPosition = Vector2.add(
      AbstractRenderer.getUnitFromVector(tile.position),
      AbstractRenderer.getUnitFromVector(direction)
    );
  }

  private handleRelease(): void {
    // TODO: check if tile is (n) percent committed to the move, we do not
    //  want to release/reset the active and linked tile if they are already
    //  committed to the move, the commitment should probably relate to the
    //  grab commitment that starts the preview move
    this.released = true;
  }

  enter(): void {
    // "board" position here simply means the non-world position, i.e. the vector
    // _not_ converted to world units
    const targetBoardPosition = Vector2.add(this.tile.position, this.direction);
    const { board } = this.tile;

    this.tile.linkedTile = this.tile.board.getTileAt(targetBoardPosition);

    // If we are switching with another tile, switch the positions here
    if (this.tile.linkedTile !== null) {
      board.switchTilePosition(this.tile.linkedTile, this.tile);
    } else {
      board.setTilePosition(this.tile, targetBoardPosition);
    }

    window.addEventListener("pointerup", this.boundRelease);
  }

  getName(): string {
    return S_PREVIEW_MOVE;
  }

  update(): State | null {
    const remainingDistance = Vector2.distance(
      Vector2.fromInterface(this.tile.sprite.position),  
      this.tile.position.toWorldUnit()
    );
    
    if (remainingDistance > AbstractRenderer.getUnit(1) && this.released) {
      return new ResetTileState(this.tile);
    }

    const primaryTileMoveComplete = this.tile.moveTile(
      this.tile, 
      this.tile.position.toWorldUnit()
    );

    // TODO: this should check if the primary tile is complete...
    if (this.tile.linkedTile === null) {
      return null;
    }

    const linkedTileMoveComplete = this.tile.moveTile(
      this.tile.linkedTile, 
      AbstractRenderer.getUnitFromVector(this.tile.linkedTile.position)
    );

    if (primaryTileMoveComplete && linkedTileMoveComplete) {
      return new CommitMoveState(this.tile);
    }

    return null;
  }
}

