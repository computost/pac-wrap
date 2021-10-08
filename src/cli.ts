#!/usr/bin/env node
import { argv, exit } from "process";
import { pac } from "./pac.js";

const args = argv.slice(2);
pac(args).catch(exit);
