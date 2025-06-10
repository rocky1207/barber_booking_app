export interface ValidationRuleType {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage?: string;
  fileErrorMessage?: string;
};