import * as PIXI from "pixi.js";
import { Board } from "./Board/Board";
import { Vector2 } from "./Vector/Vector2";
import { TileProvider } from "./Seed/TileProvider";
import { Runtime } from "./Runtime/Runtime";

export const BASE_UNIT = 64;
export const DEFAULT_LERP_SPEED = 0.15;

export const getApplicationWidth = () => window.innerWidth;
export const getApplicationHeight = () => window.innerHeight;

const stage = document.getElementById("stage") as HTMLCanvasElement;

export const application = new PIXI.Application({
  view: stage,
  width: getApplicationWidth(),
  height: getApplicationHeight(),
  antialias: false
});

const board = new Board(new Vector2(5, 10));
const tileProvider = new TileProvider();
const tileSeed = tileProvider.generateSeed(500);

// DEBUG
(window as any).board = board;
(window as any).seed = tileSeed;

const runtime = new Runtime();
export const loader = new PIXI.Loader();

loader.on("error", console.log);
loader.add("tiles", "tiles.json");

// Load assets
loader.load(() => {
  runtime.loadBoard(board, tileSeed);
  runtime.start();
});
