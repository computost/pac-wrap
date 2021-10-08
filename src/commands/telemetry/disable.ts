import { kill } from "process";
import { PacOptions, pac } from "../../pac.js";

export function disableTelemetry(pacOptions?: PacOptions) {
  return pac(["telemetry", "disable"], pacOptions);
}
