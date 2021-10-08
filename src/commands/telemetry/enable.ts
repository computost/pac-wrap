import { PacOptions, pac } from "../../pac.js";

export function enableTelemetry(pacOptions?: PacOptions) {
  return pac(["telemetry", "enable"], pacOptions);
}
