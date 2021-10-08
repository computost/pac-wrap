import pac, { PacOptions } from "../../pac.js";
import {
  createSolutionPackagerArgs,
  SolutionPackagerOptions,
} from "./solutionPackagerOptions.js";

export function unpackSolution(
  options: SolutionPackagerOptions,
  pacOptions?: PacOptions
) {
  const args = createSolutionPackagerArgs(options);
  return pac(["solution", "pack", ...args], pacOptions);
}
