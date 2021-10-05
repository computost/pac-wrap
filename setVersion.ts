import { readFile, writeFile } from "fs/promises";
import { EOL } from "os";

(async () => {
  const contents = (await readFile("./package.json")).toString();
  const { version } = JSON.parse(contents);
  const script = `export default "${version}";${EOL}`;
  await writeFile("./src/version.ts", script);
})();
