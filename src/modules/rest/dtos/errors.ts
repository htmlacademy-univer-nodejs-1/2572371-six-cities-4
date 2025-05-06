export interface ErrorResponse {
  message: string;
  code?: string;
}

export interface ValidationErrorField {
  field: string;
  message: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  errors: ValidationErrorField[];
}
