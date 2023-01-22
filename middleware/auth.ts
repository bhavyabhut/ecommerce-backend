import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { sendJsonRes } from '../utils/response';

const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return sendJsonRes(res, null, 'error while validating token', 403, false, {
      message: 'A token is required for authentication',
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET || '') as {
      user_id: string;
      email: string;
    };
    req.user = { _id: decoded.user_id, email: decoded.email };
  } catch (err) {
    console.log(err);

    return sendJsonRes(res, null, 'error while validating token', 401, false, {
      message: 'Invalid Token',
      error: err,
    });
  }
  return next();
};

export { verifyToken };
