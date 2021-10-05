import execa from "execa";
import { stdout } from "process";
import getPacPath from "./getPacPath.js";

export default async function pac(...args: string[]) {
  const pacPath = await getPacPath();
  const process = execa(pacPath, args);
  process.stdout?.pipe(stdout);
  const endPromise = new Promise((resolve) => {
    process.addListener("exit", resolve);
    process.addListener("close", resolve);
    process.addListener("disconnect", resolve);
  });
  await Promise.race([process, endPromise]);
}
