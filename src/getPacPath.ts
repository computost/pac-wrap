import { join } from "path";
import getPacFolder from "./getPacFolder.js";
import getPacFileName from "./commands/getPacFileName.js";
import pathExists from "./pathExists.js";

let path: Promise<string>;

export default function getPacPath(): Promise<string> {
  if (!path) {
    path = (async () => {
      const folderPath = await getPacFolder();
      const fileName = getPacFileName();
      const path = join(folderPath, fileName);
      if (!(await pathExists(path))) {
        throw new Error(`Could not find pac at location: ${path}`);
      }
      return path;
    })();
  }
  return path;
}
