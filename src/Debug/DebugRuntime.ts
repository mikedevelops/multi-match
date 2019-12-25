import { Runtime } from "../Runtime/Runtime";
import { application } from "../index";

export class DebugRuntime {
  constructor(private runtime: Runtime) {}

  __debug__print(output: string): void {
    console.log(output);
  }

  __debug__speed(speed: string): void {
    console.log(speed);
    const s = parseFloat(speed);
    console.log("Setting ticker speed: ", s);
    application.ticker.speed = s;
  }
}
