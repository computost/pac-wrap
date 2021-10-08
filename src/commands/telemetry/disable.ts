import { kill } from "process";
import pac, { PacOptions } from "../../pac.js";

export function disableTelemetry(pacOptions?: PacOptions) {
  return pac(["telemetry", "disable"], pacOptions);
}
