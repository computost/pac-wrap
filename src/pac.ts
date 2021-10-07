import execa from "execa";
import { stderr, stdout } from "process";
import getPacPath from "./getPacPath.js";

export default async function pac(...args: string[]) {
  const pacPath = await getPacPath();
  const process = execa(pacPath, args);
  process.stderr!.pipe(stderr);
  process.stdout!.pipe(stdout);

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
