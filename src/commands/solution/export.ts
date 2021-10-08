import { Command } from "commander";
import { EOL } from "os";
import pac from "../../pac.js";
import { IncludeSetting } from "../../types.js";
import createActionWrapper from "../createActionWrapper.js";
import createArgs from "../createArgs.js";

export default async function exportSolution(options: ExportSolutionOptions) {
  const args = createArgs(options, {
    targetVersion: "targetversion",
    include: (value, args) => {
      for (const setting of value) {
        args.push("--include", setting);
      }
    },
    maxAsyncWaitTime: "max-async-wait-time",
  });
  return pac("solution", "export", ...args);
}

export function registerCommand(solution: Command) {
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
      "Max asynchronous wait time in minutes. Default value is 60 minutes",
      parseInt
    )
    .action(createActionWrapper(exportSolution));
}

interface ExportSolutionOptions {
  path: string;
  name: string;
  managed?: boolean;
  targetVersion?: string;
  include?: IncludeSetting[];
  async?: boolean;
  maxAsyncWaitTime?: number;
}
