import { PacOptions, pac } from "../../pac.js";
import createArgs from "../createArgs.js";

export async function importSolution(
  options: ImportSolutionOptions,
  pacOptions?: PacOptions
) {
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

  return pac(["solution", "import", ...args], pacOptions);
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
