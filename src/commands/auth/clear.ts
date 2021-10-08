import pac, { PacOptions } from "../../pac.js";

export function clearAuth(pacOptions?: PacOptions) {
  return pac(["auth", "clear"], pacOptions);
}
