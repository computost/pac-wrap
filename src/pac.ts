import execa from "execa";
import { stderr, stdin, stdout } from "process";
import getPacPath from "./getPacPath.js";

export default async function pac(...args: string[]) {
  const pacPath = await getPacPath();
  const process = execa(pacPath, args);
  process.stdout!.pipe(stdout);
  process.stderr!.pipe(stderr);
  stdin.pipe(process.stdin!);
  process.on("close", () => {
    stdin.unpipe(process.stdin!);
  });
  await process;
}
