import { Request, Response, NextFunction } from 'express';
import { Comment, Landmark, User } from '../models';

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { content, userId, landmarkId } = req.body;

    if (!content || !userId || !landmarkId) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }

    const landmark = await Landmark.findByPk(landmarkId);
    if (!landmark) {
      res.status(404).json({ error: 'Landmark not found.' });
      return;
    }

    const comment = await Comment.create({
      content,
      userId,
      landmarkId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    next(error);
  }
};

export const getCommentsByLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { landmarkId } = req.params;

    const comments = await Comment.findAll({
      where: { landmarkId },
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    await comment.destroy();
    res.status(204).json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    next(error);
  }
};
