import { Command } from "commander";
import pac from "../../pac.js";
import createActionWrapper from "../createActionWrapper.js";
import {
  createSolutionPackagerArgs,
  registerSolutionPackagerOptions,
  SolutionPackagerOptions,
} from "./solutionPackagerOptions.js";

export default async function packSolution(options: SolutionPackagerOptions) {
  const args = createSolutionPackagerArgs(options);
  return pac("solution", "pack", ...args);
}

export function registerCommand(solution: Command) {
  const command = solution
    .command("unpack")
    .description(
      "Extract solution components from solution.zip onto local filesystem (SolutionPackager)"
    )
    .action(createActionWrapper(packSolution));
  registerSolutionPackagerOptions(command);
}
