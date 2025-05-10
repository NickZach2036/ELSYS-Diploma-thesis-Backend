import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Landmark, Station } from '../models';

export const getLandmarks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { stationId, walkingMinutes } = req.query;

    if (!stationId || !walkingMinutes) {
      res.status(400).json({
        error: 'stationId and walkingMinutes query parameters are required.',
      });
      return;
    }

    const parsedStationId = parseInt(stationId as string, 10);
    const parsedWalkingMinutes = parseInt(walkingMinutes as string, 10);

    if (isNaN(parsedStationId) || isNaN(parsedWalkingMinutes)) {
      res.status(400).json({
        error: 'stationId and walkingMinutes must be valid numbers.',
      });
      return;
    }

    const maxDistance = parsedWalkingMinutes * 80;

    const landmarks = await Landmark.findAll({
      where: {
        stationId: parsedStationId,
        distanceFromStation: {
          [Op.lte]: maxDistance,
        },
      },
      include: [
        {
          model: Station,
          attributes: ['id', 'name', 'location'],
        },
      ],
    });

    res.status(200).json(landmarks);
  } catch (error) {
    console.error('Error fetching landmarks:', error);
    next(error);
  }
};

export const createLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, description, location, stationId } = req.body;
    if (!name || !description || !location || !stationId) {
      res.status(400).json({
        error: 'Name, description, location, and stationId are required.',
      });
      return;
    }

    const landmark = await Landmark.create({
      name,
      description,
      location,
      stationId,
      distanceFromStation: 0,
    });
    res.status(201).json(landmark);
  } catch (error) {
    console.error('Error creating landmark:', error);
    next(error);
  }
};

export const updateLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, location, stationId } = req.body;

    const landmark = await Landmark.findByPk(id);
    if (!landmark) {
      res.status(404).json({ error: 'Landmark not found.' });
      return;
    }

    landmark.name = name || landmark.name;
    landmark.description = description || landmark.description;
    landmark.location = location || landmark.location;
    landmark.stationId = stationId || landmark.stationId;

    await landmark.save();
    res.status(200).json(landmark);
  } catch (error) {
    console.error('Error updating landmark:', error);
    next(error);
  }
};

export const deleteLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const landmark = await Landmark.findByPk(id);
    if (!landmark) {
      res.status(404).json({ error: 'Landmark not found.' });
      return;
    }

    await landmark.destroy();
    res.status(204).json({ message: 'Landmark deleted successfully.' });
  } catch (error) {
    console.error('Error deleting landmark:', error);
    next(error);
  }
};

export const createUserLandmark = async (
  req: Request & { user?: { id: number; username: string } },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, description, location, stationId } = req.body;

    if (!name || !description || !location || !stationId) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }

    const newLandmark = await Landmark.create({
      name,
      description,
      location,
      stationId,
      distanceFromStation: 0,
    });

    res.status(201).json(newLandmark);
  } catch (e) {
    const error = e instanceof Error ? e : new Error('Unknown error');
    console.error('Error creating user landmark:', error.message);
    next(error);
  }
};
