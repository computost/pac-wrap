import { Command } from "commander";
import { EOL } from "os";
import pac from "../../pac.js";
import createActionWrapper from "../createActionWrapper.js";
import createArgs from "../createArgs.js";

export default async function importSolution(options: ImportSolutionOptions) {
  const args = createArgs(options, {
    activatePlugins: "activate-plugins",
    forceOverwrite: "force-overwrite",
    skipDependencyCheck: "skip-dependency-check",
    importAsHolding: "import-as-holding",
    publishChanges: "publish-changes",
    convertToManaged: "convert-to-managed",
    maxAsyncWaitTime: "max-async-wait-time",
    settingsFile: "settings-file",
  });
  return pac("solution", "import", ...args);
}

export function registerCommand(solution: Command) {
  solution
    .command("import")
    .description(
      "Import the Dataverse Solution project output into the current Dataverse Organization."
    )
    .requiredOption(
      "-p, --path <path>",
      "Path to solution zip file. If not specified, assumes the current folder is a cdsproj project."
    )
    .option(
      "-ap, --activate-plugin",
      "Activate plug-ins and workflows on the solution."
    )
    .option(
      "-f, --force-overwrite",
      "Force an overwrite of unmanaged customizations."
    )
    .option(
      "-s, --skip-dependency-check",
      "Skip dependency check against dependencies flagged as product update."
    )
    .option(
      "-h, --import-as-holding",
      "Import the solution as a holding solution."
    )
    .option(
      "-pc, --publish-changes",
      "Publish your changes upon a successful import."
    )
    .option("-cm, --convert-to-managed", "Convert as Managed Solution.")
    .option("-a, --async", "Imports solution asynchronously.")
    .option(
      "-wt, --max-async-wait-time",
      "Max asynchronous wait time in minutes. Default value is 60 mintues."
    )
    .option(
      "--settings-file",
      "The .json file with the deployment settings for connection references and environment variables."
    )
    .action(createActionWrapper(importSolution));
}

interface ImportSolutionOptions {
  path: string;
  activatePlugins: boolean;
  forceOverwrite: boolean;
  skipDependencyCheck: boolean;
  importAsHolding: boolean;
  publishChanges: boolean;
  convertToManaged: boolean;
  async: boolean;
  maxAsyncWaitTime: number;
  settingsFile: string;
}
