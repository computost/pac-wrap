import execa from "execa";
import { stderr, stdout } from "process";
import getPacPath from "./getPacPath.js";

export default async function pac(...args: string[]) {
  const pacPath = await getPacPath();
  const process = execa(pacPath, args);
  process.stderr?.pipe(stderr);
  process.stdout?.pipe(stdout);
  await process;
}
