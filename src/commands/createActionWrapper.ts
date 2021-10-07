import { exit } from "process";

export default function createActionWrapper(
  action: (options: any) => Promise<number>
) {
  return (options: any) => {
    action(options)
      .then((exitCode) => exit(exitCode))
      .catch((exitCode: number) => exit(exitCode));
  };
}
