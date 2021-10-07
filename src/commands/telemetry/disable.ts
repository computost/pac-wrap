import pac from "../../pac.js";

export default function disableTelemetry() {
  return pac("telemetry", "disable");
}
