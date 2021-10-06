import execa from "execa";
import getPacPath from "./getPacPath.js";

export default async function pac(...args: string[]) {
  const pacPath = await getPacPath();
  const process = execa(pacPath, args);
  process.stdout!.on("data", (data) => console.log(data.toString()));
  process.stderr!.on("data", (data) => console.error(data.toString()));
  await process;
}
