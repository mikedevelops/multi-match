import * as PIXI from "pixi.js";
import { BoardRenderer } from "./Renderer/BoardRenderer";
import { Board } from "./Board/Board";
import { Vector2 } from "./Vector/Vector2";
import { TileProvider } from "./Seed/TileProvider";
import { TileRenderer } from "./Renderer/TileRenderer";
import { ColumnRenderer } from "./Renderer/ColumnRenderer";
import { Runtime } from "./Runtime/Runtime";

export const BASE_UNIT = 128;

export const getApplicationWidth = () => window.innerWidth;
export const getApplicationHeight = () => window.innerHeight;

const stage = document.getElementById("stage") as HTMLCanvasElement;

export const application = new PIXI.Application({
  view: stage,
  width: getApplicationWidth(),
  height: getApplicationHeight()
});
const tileRenderer = new TileRenderer();
const columnRenderer = new ColumnRenderer(tileRenderer);
const boardRenderer = new BoardRenderer(columnRenderer);

const board = new Board(new Vector2(2, 1));
const tileProvider = new TileProvider();
const tileSeed = tileProvider.generateSeed(500);

(window as any).seed = tileSeed;

const runtime = new Runtime(boardRenderer);

runtime.loadBoard(board, tileSeed);
runtime.start();

// DEBUG
(window as any).board = board;
