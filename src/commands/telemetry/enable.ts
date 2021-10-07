import pac from "../../pac.js";

export default function enableTelemetry() {
  return pac("telemetry", "enable");
}
