import execa from "execa";
import { stderr, stdout } from "process";
import getPacPath from "./getPacPath.js";

export default async function pac(...args: string[]) {
  const pacPath = await getPacPath();
  const process = execa(pacPath, args, { stdin: "ipc" });
  process.stdout!.pipe(stdout);
  process.stderr!.pipe(stderr);
  await process;
}
