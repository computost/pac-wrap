import { Command } from "commander";
import createActionWrapper from "../createActionWrapper.js";
import disableTelemetry from "./disable.js";
import enableTelemetry from "./enable.js";
import showTelemetryStatus from "./status.js";

export default function registerTelemetryCommands(program: Command) {
  const telemetry = program
    .command("telemetry")
    .description("Manage telemetry settings");

  telemetry
    .command("enable")
    .description(
      "Choose to send usage information to help Microsoft improve this product"
    )
    .action(createActionWrapper(enableTelemetry));

  telemetry
    .command("disable")
    .description(
      "Choose to not send usage information to help Microsoft improve this product"
    )
    .action(createActionWrapper(disableTelemetry));

  telemetry
    .command("status")
    .description("Show the current status of telemetry")
    .action(createActionWrapper(showTelemetryStatus));
}
