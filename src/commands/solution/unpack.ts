import { PacOptions, pac } from "../../pac.js";
import {
  createSolutionPackagerArgs,
  SolutionPackagerOptions,
} from "./solutionPackagerOptions.js";

export function unpackSolution(
  options: SolutionPackagerOptions,
  pacOptions?: PacOptions
) {
  const args = createSolutionPackagerArgs(options);
  return pac(["solution", "unpack", ...args], pacOptions);
}
