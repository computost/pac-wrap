#!/usr/bin/env node
import { program } from "commander";
import { EOL } from "os";
import { exit } from "process";
import help from "./commands/help.js";
import exportSolution from "./commands/solution/export.js";
import version from "./version.js";

program.version(version);

program
  .command("help")
  .description('run "pac help"')
  .action(createActionWrapper(help));

const solution = program.command("solution");
solution
  .command("export")
  .description(
    "Export a Dataverse Solution project from the current Dataverse Organization"
  )
  .requiredOption(
    "-p, --path <path>",
    "Path where the exported solution zip file will be written"
  )
  .requiredOption(
    "-n, --name <name>",
    "The name of the solution to be exported"
  )
  .option(
    "-m, --managed",
    "Whether the solution should be exported as a managed solution"
  )
  .option(
    "-v, --targetVersion <version>",
    "The version that the exported solution will support"
  )
  .option(
    "-i, --include <settings...>",
    `Which settings should be included in the solution being exported${EOL}` +
      `Values: ${[
        "autonumbering",
        "calendar",
        "customization",
        "emailtracking",
        "externalapplications",
        "general",
        "isvconfig",
        "marketing",
        "outlooksynchronization",
        "relationshiproles",
        "sales",
      ].join(", ")}`
  )
  .option("-a, --async", "Exports solution asynchronously")
  .option(
    "-wt, --maxAsyncWaitTime <minutes>",
    "Max asynchronous wait time in minutes. Default value is 60 mintues"
  )
  .action(createActionWrapper(exportSolution));

program.parse();

function createActionWrapper(action: (options: any) => Promise<number>) {
  return (options: any) => {
    action(options)
      .then((exitCode) => exit(exitCode))
      .catch((exitCode: number) => exit(exitCode));
  };
}
