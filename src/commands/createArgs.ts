import { NonUndefined } from "../types.js";

export default function createArgs<TOptions>(
  options: TOptions,
  customArgs?: CustomArgs<TOptions>
) {
  const args: string[] = [];
  for (const key in options) {
    const value = options[key];
    if (value !== undefined) {
      if (customArgs !== undefined && key in customArgs) {
        const customArg = customArgs[key];
        switch (typeof customArg) {
          case "function":
            // I believe this is a TS bug
            //   Argument of type 'TOptions[Extract<keyof TOptions, string>]' is not assignable to parameter of type 'NonUndefined<TOptions[Extract<keyof TOptions, string>]>'.
            //   Type 'TOptions[string]' is not assignable to type 'NonUndefined<TOptions[Extract<keyof TOptions, string>]>'.
            customArg(value as any, args);
            break;
          case "string":
            args.push(`--${customArg}`, `${value}`);
            break;
        }
      } else {
        args.push(`--${key}`, `${value}`);
      }
    }
  }
  return args;
}

type CustomArgs<Options> = {
  [Key in keyof Options]?:
    | string
    | ((value: NonUndefined<Options[Key]>, args: string[]) => void);
};
