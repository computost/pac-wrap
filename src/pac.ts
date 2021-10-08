import execa, { ExecaChildProcess } from "execa";
import { stderr as defaultStderr, stdout as defaultStdout } from "process";
import getPacPath from "./getPacPath.js";

export default async function pac(args: string[], options?: PacOptions) {
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
    process = execa(pacPath, args);
    process.stderr!.pipe(defaultStderr);
    process.stdout!.pipe(defaultStdout);
  }

  /** Need to return this promise instead of the process object as a
   * work-around for a current bug in Azure DevOps where pac will hang after
   * exiting. */
  return new Promise<number>((resolve, reject) =>
    process.on("exit", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    })
  );
}

export interface PacOptions {
  stderr?: typeof defaultStderr | "ignore";
  stdout?: typeof defaultStdout | "ignore";
}
