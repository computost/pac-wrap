#!/usr/bin/env node
import { argv, exit } from "process";
import getPacFolder from "./getPacFolder.js";
import { pac } from "./pac.js";

const args = argv.slice(2);
(async () => {
  if (args[0] === "folder") {
    const folder = await getPacFolder();
    console.log(folder);
  } else if (args[0] === "install") {
    if (args.length >= 3) {
      const version = args[2];
      await getPacFolder(version);
    } else {
      await getPacFolder();
    }
  } else {
    await pac(args);
  }
})().catch(exit);
