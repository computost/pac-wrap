import { Command } from "commander";
import { registerCommand as registerExport } from "./export.js";
import { registerCommand as registerImport } from "./import.js";
import { registerCommand as registerPack } from "./pack.js";
import { registerCommand as registerUnpack } from "./unpack.js";

export default function registerSolutionCommands(program: Command) {
  const solution = program
    .command("solution")
    .description("Commands for working with Dataverse solution projects");
  registerExport(solution);
  registerImport(solution);
  registerPack(solution);
  registerUnpack(solution);
}
