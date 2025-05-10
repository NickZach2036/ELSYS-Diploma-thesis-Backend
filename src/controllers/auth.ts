import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import constants from '../constants';
import {
  validateUsernameOrFail,
  validatePasswordOrFail,
  createUser as createNewUser,
} from '../utils/user-utils';

type CustomResponse = Response & {
  sendRes: (data: string | number | boolean | object | null) => Response;
};

const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const resWithSend = res as CustomResponse;
  try {
    const { username, password } = req.body;

    validateUsernameOrFail(username);
    validatePasswordOrFail(password);

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      resWithSend
        .status(409)
        .sendRes({ message: 'Username is already taken.' });
      return;
    }

    const user = await createNewUser(username, password);

    const token = sign(
      { id: user.getDataValue('id'), username: user.getDataValue('username') },
      constants.JWT_SECRET_KEY,
      { expiresIn: constants.JWT_EXPIRES_IN },
    );

    resWithSend.status(201).sendRes({
      message: 'User registered successfully.',
      user,
      token,
    });
  } catch (e) {
    const error =
      e instanceof Error ? e : new Error('Unknown registration error');
    console.error('Registration error:', error.message);
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const resWithSend = res as CustomResponse;
  try {
    const { username, password } = req.body;

    validateUsernameOrFail(username);

    const user = await User.findOne({ where: { username } });
    if (!user) {
      resWithSend.status(400).sendRes({ message: 'User not found.' });
      return;
    }

    const hashedPassword = user.getDataValue('password');
    if (typeof hashedPassword !== 'string') {
      throw new Error('Stored password is invalid.');
    }

    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (!validPassword) {
      resWithSend.status(400).sendRes({ message: 'Incorrect password.' });
      return;
    }

    const token = sign(
      { id: user.getDataValue('id'), username: user.getDataValue('username') },
      constants.JWT_SECRET_KEY,
      { expiresIn: constants.JWT_EXPIRES_IN },
    );

    resWithSend.status(200).sendRes({ message: 'Login successful.', token });
  } catch (e) {
    const error = e instanceof Error ? e : new Error('Unknown login error');
    console.error('Login error:', error.message);
    next(error);
  }
};

export { register, login };
