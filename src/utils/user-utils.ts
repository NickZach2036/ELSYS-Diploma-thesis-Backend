import User from '../models/user';
import * as bcrypt from 'bcrypt';

export const validateUsernameOrFail = (username: string) => {
  if (!username || username.trim().length < 3) {
    throw new Error('Invalid username. Must be at least 3 characters.');
  }
};

export const validatePasswordOrFail = (password: string) => {
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
};

export const createUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword });
};
