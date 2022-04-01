import { RegisterOptions, FieldValues, FieldPath } from "react-hook-form";

export type ValidationRules<TFieldValues extends FieldValues> = Omit<
  RegisterOptions<TFieldValues, FieldPath<TFieldValues>>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type FormValidation<TFieldValues> = {
  [FieldName in keyof TFieldValues]?: ValidationRules<TFieldValues>;
};
