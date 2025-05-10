import { Request, Response, NextFunction } from 'express';
import Station from '../models/station';

export const createStation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, location } = req.body;

    if (!name || !location) {
      res.status(400).json({ error: 'Name and location are required.' });
      return;
    }

    const station = await Station.create({ name, location });
    res.status(201).json(station);
  } catch (error) {
    console.error('Create station error:', error);
    next(error);
  }
};

export const getStations = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const stations = await Station.findAll();
    res.status(200).json(stations);
  } catch (error) {
    console.error('Get stations error:', error);
    next(error);
  }
};
