export interface IValidationFunction {
  (value: string | number): boolean | string;
}
