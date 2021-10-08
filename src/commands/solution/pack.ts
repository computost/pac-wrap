import pac, { PacOptions } from "../../pac.js";
import {
  createSolutionPackagerArgs,
  SolutionPackagerOptions,
} from "./solutionPackagerOptions.js";

export async function packSolution(
  options: SolutionPackagerOptions,
  pacOptions?: PacOptions
) {
  const args = createSolutionPackagerArgs(options);
  return pac(["solution", "pack", ...args], pacOptions);
}
