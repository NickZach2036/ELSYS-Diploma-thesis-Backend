import { Request, Response, NextFunction } from 'express';
import { Landmark, Station } from '../models';

export const getLandmarks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const landmarks = await Landmark.findAll({
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

export const createNewLandmark = async (
  req: Request,
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
    });

    res.status(201).json(newLandmark);
  } catch (error) {
    console.error('Error creating new landmark:', error);
    next(error);
  }
};
