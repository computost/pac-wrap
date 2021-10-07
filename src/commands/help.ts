import { Command } from "commander";
import pac from "../pac.js";
import createActionWrapper from "./createActionWrapper.js";

export default function help() {
  return pac("help");
}

export function registerCommand(program: Command) {
  program
    .command("help")
    .description("Show help for the Microsoft PowerPlatform CLI")
    .action(createActionWrapper(help));
}
