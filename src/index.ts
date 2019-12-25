import * as PIXI from "pixi.js";
import { Board } from "./Board/Board";
import { Vector2 } from "./Vector/Vector2";
import { TileProvider } from "./Seed/TileProvider";
import { Runtime, RuntimeMode } from "./Runtime/Runtime";
import { StateManager } from "./State/StateManager";
import { DebugRuntime } from "./Debug/DebugRuntime";

export const BASE_UNIT = 48;
export const DEFAULT_LERP_SPEED = 0.15;

export const getApplicationWidth = () => window.innerWidth;
export const getApplicationHeight = () => window.innerHeight;

const stage = document.getElementById("stage") as HTMLCanvasElement;

export const application = new PIXI.Application({
  view: stage,
  width: getApplicationWidth(),
  height: getApplicationHeight(),
  resolution: 1
});

export const RUNTIME_MODE: RuntimeMode = RuntimeMode.Production;
// application.ticker.speed = 0.25;

const boardStateManager = new StateManager();
const board = new Board(new Vector2(8, 12), boardStateManager);
const tileProvider = new TileProvider();
const tileSeed = tileProvider.generateSeed(10000); 

// DEBUG
(window as any).board = board;
(window as any).app = application;

export const runtime = new Runtime();

// TODO: Create a synchronous loader that does not fetch assets over the
//  network and can deal with spritesheet json exports.

// TODO: WAIT! The game will eventually need to be served over a network
//  anyway, so is this even worth it. It just makes sharing a static version
//  more difficult... but I can use `fromImage` for now if it's such a problem
export const loader = new PIXI.Loader();

loader.add("tiles", "tiles.json");
loader.onError = console.log;

// Load assets
loader.load(() => {
  runtime.loadBoard(board, tileSeed);
  runtime.start();
});

window.addEventListener('contextmenu', e => e.preventDefault());

// import the debugger module once the runtime is setup
// import "./Debug/DebugConsole";
