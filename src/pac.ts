import execa, { ExecaChildProcess, node } from "execa";
import { dirname, join } from "path";
import { stderr as defaultStderr, stdout as defaultStdout } from "process";
import { fileURLToPath } from "url";
import getPacPath from "./getPacPath.js";

export async function pac(args: string[], options?: PacOptions) {
  const pacPath = await getPacPath();
  let process: ExecaChildProcess<string>;
  if (options && (options.stderr || options.stdout)) {
    const { stderr, stdout } = options;
    process = execa(pacPath, args, {
      ...(stderr === "ignore" && { stderr: "ignore" }),
      ...(stdout === "ignore" && { stdout: "ignore" }),
    });
    if (stderr !== "ignore") {
      process.stderr!.pipe(stderr ?? defaultStderr);
    }
    if (stdout !== "ignore") {
      process.stdout!.pipe(stdout ?? defaultStdout);
    }
  } else {
    /** Need to run this in a child process as a work-around for a current bug
     * in Azure DevOps where pac will hang after exiting. */
    process = node(join(getDirName(), "pac-child.js"), [pacPath, ...args]);
    process.stderr!.pipe(defaultStderr);
    process.stdout!.pipe(defaultStdout);
  }

  return await process;
}

function getDirName() {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  return dirName;
}

export interface PacOptions {
  stderr?: typeof defaultStderr | "ignore";
  stdout?: typeof defaultStdout | "ignore";
}
