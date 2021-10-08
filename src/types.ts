export type PackageType = "Managed" | "Unmanaged" | "Both";

export type IncludeSetting =
  | "autonumbering"
  | "calendar"
  | "customization"
  | "emailtracking"
  | "externalapplications"
  | "general"
  | "isvconfig"
  | "marketing"
  | "outlooksynchronization"
  | "relationshiproles"
  | "sales";

export type ErrorLevel = "Verbose" | "Info" | "Warning" | "Error" | "Off";

export type SingleComponent = "WebResource" | "Plugin" | "Workflow" | "None";

export type YesNoPrompt = "Yes" | "No" | "Prompt";

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
export type PickWhere<Base, Condition> = NonNullable<
  FilterFlags<Base, Condition>[keyof Base]
>;

export type NonUndefined<T> = T extends undefined ? never : T;
