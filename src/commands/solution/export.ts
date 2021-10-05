import pac from "../../pac.js";

export default async function exportSolution(options: ExportSolutionOptions) {
  const args = createArgs(options);
  await pac("solution", "export", ...args);
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

interface ExportSolutionOptions {
  path: string;
  name: string;
  managed?: boolean;
  targetVersion?: string;
  include?: Include[];
  async?: boolean;
  maxAsyncWaitTime?: number;
}

type Include =
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
