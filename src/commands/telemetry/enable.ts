import pac, { PacOptions } from "../../pac.js";

export function enableTelemetry(pacOptions?: PacOptions) {
  return pac(["telemetry", "enable"], pacOptions);
}
