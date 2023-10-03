import { Response } from 'express';

type ISendResponse<T, K> = {
  status_code: number;
  message: string;
  success: boolean;
  meta?: K | null;
  data?: T | null;
  token?: string;
};

const sendResponse = <T, K>(res: Response, data: ISendResponse<T, K>): void => {
  res.status(data.status_code).json({
    success: data.success,
    statusCode: data.status_code,
    message: data.message ?? '',
    meta: data.meta || undefined,
    data: data.data || undefined,
    token: data?.token || undefined,
  });
};

export default sendResponse;
