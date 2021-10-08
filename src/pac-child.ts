import execa from "execa";
import { argv, exit, stderr, stdout } from "process";

const pacPath = argv[2];
const args = argv.slice(3);
const process = execa(pacPath, args);
process.stderr!.pipe(stderr);
process.stdout!.pipe(stdout);
process.on("exit", exit);
