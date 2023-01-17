import { Response } from 'express';

export const responseDataFormatter = (
  data: any,
  message: string,
  status: number,
  isSuccess = true,
  err?: any
) => {
  return {
    message,
    isSuccess,
    data,
    err,
    status,
  };
};

const sendJsonRes = (
  res: Response,
  data: any,
  message: string,
  status: number,
  isSuccess = true,
  err?: any
) => {
  return res
    .status(status)
    .json(responseDataFormatter(data, message, status, isSuccess, err));
};

export { sendJsonRes };
