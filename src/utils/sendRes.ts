import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import constants from '../constants';

type CustomResponse = Response & {
  sendRes: (data: string | number | boolean | object | null) => Response;
};

export const sendRes = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  (res as CustomResponse).sendRes = function (
    data: string | number | boolean | object | null,
  ): Response {
    return this.json({ success: true, data });
  };
  next();
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const resWithSend = res as CustomResponse;
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) {
    resWithSend.status(401).sendRes({ message: 'No token provided.' });
    return;
  }

  verify(
    token,
    constants.JWT_SECRET_KEY,
    (error: unknown, decoded: unknown) => {
      if (
        error ||
        typeof decoded !== 'object' ||
        decoded === null ||
        !('id' in decoded) ||
        !('username' in decoded)
      ) {
        resWithSend.status(403).sendRes({ message: 'Invalid token.' });
        return;
      }

      const user = decoded as { id: number; username: string };
      (req as Request & { user: { id: number; username: string } }).user = user;
      next();
    },
  );
};
