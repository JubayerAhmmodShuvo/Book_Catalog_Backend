export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type error_type = {
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
  stack?: string | undefined;
};

export type modified_error_res_type = {
  status_code: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
