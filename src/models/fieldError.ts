import { AxiosError } from "axios";

interface FieldErrorDetail {
  field: string;
  message: string[];
}

interface FieldErrorData {
  detail: FieldErrorDetail [];
}

export type FieldError = AxiosError<FieldErrorData>;

export const isFieldError = (error: AxiosError): error is FieldError => "detail" in (error.response?.data as object);
