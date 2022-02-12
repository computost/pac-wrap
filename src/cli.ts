#!/usr/bin/env node
import { argv, exit } from "process";
import getPacFolder from "./getPacFolder.js";
import { pac } from "./pac.js";

const args = argv.slice(2);
(async () => {
  if (args[0] === "folder") {
    const folder = await getPacFolder();
    console.log(folder);
  } else {
    await pac(args);
  }
})().catch(exit);
