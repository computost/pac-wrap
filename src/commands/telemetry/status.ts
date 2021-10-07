import pac from "../../pac.js";

export default function showTelemetryStatus() {
  return pac("telemetry", "status");
}
