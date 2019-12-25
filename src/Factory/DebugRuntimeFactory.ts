import { DebugRuntime } from "../Debug/DebugRuntime";
import { runtime } from "../index";

export const createDebugRuntime = () => {
  return new DebugRuntime(runtime);
};
