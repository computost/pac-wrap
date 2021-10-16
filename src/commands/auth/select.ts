import { pac, PacOptions } from "../../pac.js";
import createArgs from "../createArgs.js";

export function selectAuth(
  options: SelectAuthOptions,
  pacOptions?: PacOptions
) {
  const args = createArgs(options);
  return pac(["auth", "select", ...args], pacOptions);
}

interface SelectAuthOptions {
  index?: number;
  name?: string;
}
