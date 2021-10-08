import { PacOptions, pac } from "../../pac.js";
import createArgs from "../createArgs.js";

export function exportSolution(
  options: ExportSolutionOptions,
  pacOptions?: PacOptions
) {
  const args = createArgs(options, {
    targetVersion: "targetversion",
    include: (value, args) => {
      for (const setting of value) {
        args.push("--include", setting);
      }
    },
    maxAsyncWaitTime: "max-async-wait-time",
  });

  return pac(["solution", "export", ...args], pacOptions);
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

type IncludeSetting =
  | "autonumbering"
  | "calendar"
  | "customization"
  | "emailtracking"
  | "externalapplications"
  | "general"
  | "isvconfig"
  | "marketing"
  | "outlooksynchronization"
  | "relationshiproles"
  | "sales";
