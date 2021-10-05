#!/usr/bin/env node
import { program } from "commander";
import help from "./commands/help.js";
import version from "./version.js";

program.version(version);
program.command("help").description('run "pac help"').action(help);
program.parse();
