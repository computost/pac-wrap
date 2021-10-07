import { Command } from "commander";
import { EOL } from "os";
import pac from "../../pac.js";
import { IncludeSetting } from "../../types.js";
import createActionWrapper from "../createActionWrapper.js";

export default async function exportSolution(options: ExportSolutionOptions) {
  const args = createArgs(options);
  return pac("solution", "export", ...args);
}

function createArgs(options: ExportSolutionOptions) {
  const {
    path,
    name,
    managed,
    targetVersion,
    include,
    async,
    maxAsyncWaitTime,
  } = options;
  const args = ["--path", path, "--name", name];
  if (managed) {
    args.push("--managed");
  }
  if (targetVersion) {
    args.push("--targetversion", targetVersion);
  }
  if (include) {
    for (const setting of include) {
      args.push("--include", setting);
    }
  }
  if (async) {
    args.push("--async");
  }
  if (maxAsyncWaitTime) {
    args.push("max-async-wait-time", `${maxAsyncWaitTime}`);
  }
  return args;
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
      "Max asynchronous wait time in minutes. Default value is 60 mintues"
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
