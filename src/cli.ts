#!/usr/bin/env node
import { program } from "commander";
import registerSolutionCommands from "./commands/solution/registerCommands.js";
import registerTelemetryCommands from "./commands/telemetry/registerCommands.js";
import { registerCommand as registerHelp } from "./commands/help.js";
import version from "./version.js";

program.version(version);

registerHelp(program);
registerSolutionCommands(program);
registerTelemetryCommands(program);

program.parse();
