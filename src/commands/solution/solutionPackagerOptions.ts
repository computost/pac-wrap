import {
  ErrorLevel,
  PackageType,
  SingleComponent,
  YesNoPrompt,
} from "../../types.js";
import createArgs from "../createArgs.js";

export function createSolutionPackagerArgs(options: SolutionPackagerOptions) {
  return createArgs(options, {
    zipFile: "zipfile",
    packageType: "packagetype",
    errorLevel: "errorlevel",
  });
}

export interface SolutionPackagerOptions {
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
