export interface ValidationRuleType {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: string) => boolean;
  errorMessage?: string;
};