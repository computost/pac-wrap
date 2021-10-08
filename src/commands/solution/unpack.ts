import { Command } from "commander";
import pac from "../../pac.js";
import {
  ErrorLevel,
  PackageType,
  SingleComponent,
  YesNoPrompt,
} from "../../types.js";
import createActionWrapper from "../createActionWrapper.js";
import createArgs from "../createArgs.js";

export default async function unpackSolution(options: UnpackSolutionOptions) {
  const args = createArgs(options, {
    zipFile: "zipfile",
    packageType: "packagetype",
    errorLevel: "errorlevel",
  });
  return pac("solution", "unpack", ...args);
}

export function registerCommand(solution: Command) {
  solution
    .command("unpack")
    .description(
      "Extract solution components from solution.zip onto local filesystem (SolutionPackager)"
    )
    .requiredOption(
      "-z, --zipFile <zipFile>",
      "The full path to the solution ZIP file"
    )
    .requiredOption(
      "-f, --folder <folder>",
      "The path to the root folder on the local filesystem. " +
        "When unpacking/extractins, this will be written to, when packing this will be read from."
    )
    .option(
      "-p, --packageType <packageType>",
      "When unpacking/extracting, use to specify dual Managed and Unmanaged operation. " +
        "When packing, use to specify Managed or Unmanaged from a previous unpack 'Both'. " +
        "Can be: 'Unmanaged', 'Managed' or 'Both'; default: 'Unmanaged'."
    )
    .option("-l, --log <log>", "The path to the log file.")
    .option(
      "-e, --errorLevel <errorLevel>",
      "Minimum logging level for log output [Verbose|Info|Warning|Error|Off]."
    )
    .option(
      "-sc, --singleComponent <singleComponent>",
      "Only perform action on a single component type [WebResource|Plugin|Workflow|None]; default: None."
    )
    .option(
      "-ad, --allowDelete",
      "Dictates if delete operations may occur [Yes|No|Prompt]; default: prompt."
    )
    .option(
      "-aw, --allowWrite",
      "Dictates if write operations may occur; default: false."
    )
    .option(
      "-c, --clobber",
      "Enables that files marked read-only can be deleted or overwritten; default: false."
    )
    .option(
      "-m, --map",
      "The full path to a mapping xml file from which to read component folders to pack."
    )
    .option(
      "-src, --sourceLoc",
      "Generates a template resource file. Valid only on Extract. " +
        "Possible Values are auto or an LCID/ISO code of the language you wish to export. " +
        "When Present, this will extract the string resources from the given locale as a neutral .resx. " +
        "If auto or just the long or short form of the switch is specified the base locale for the solution will be used."
    )
    .option(
      "-loc, --localize",
      "Extract or merge all string resources into .resx files."
    )
    .option(
      "-lcid, --useLcid",
      "Use LCID's (1033) rather than ISO codes (en-US) for language files."
    )
    .option(
      "-same, --useUnmanagedFileForMissingManaged",
      "Use the same XML source file when packaging for Managed and only Unmanaged XML file is found; " +
        "applies to AppModuleSiteMap, AppModuleMap, FormXml files."
    )
    .action(createActionWrapper(unpackSolution));
}

interface UnpackSolutionOptions {
  zipFile: string;
  folder: string;
  packageType?: PackageType;
  log?: string;
  errorLevel?: ErrorLevel;
  singleComponent?: SingleComponent;
  allowDelete?: YesNoPrompt;
  allowWrite?: boolean;
  clobber?: boolean;
  map?: string;
  sourceLoc?: string;
  localize?: boolean;
  useLcid?: boolean;
  useUnmanagedFileForMissingManaged?: boolean;
}
