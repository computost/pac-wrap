export type PackageType = "Managed" | "Unmanaged" | "Both";

export type ErrorLevel = "Verbose" | "Info" | "Warning" | "Error" | "Off";

export type SingleComponent = "WebResource" | "Plugin" | "Workflow" | "None";

export type YesNoPrompt = "Yes" | "No" | "Prompt";

export type NonUndefined<T> = T extends undefined ? never : T;
