import pac, { PacOptions } from "../pac.js";

export function help(pacOptions?: PacOptions) {
  return pac(["help"], pacOptions);
}
