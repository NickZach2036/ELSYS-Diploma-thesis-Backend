import { Request, Response, NextFunction } from 'express';
import { Comment, Landmark, User } from '../models';

interface AuthenticatedRequest extends Request {
  user?: { id: number; username: string };
}

type CustomResponse = Response & {
  sendRes: (data: string | number | boolean | object | null) => Response;
};

export const createComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const resWithSend = res as CustomResponse;
  try {
    const { content, landmarkId } = req.body;
    const userId = req.user?.id;

    if (!content || !userId || !landmarkId) {
      resWithSend.status(400).sendRes({ message: 'All fields are required.' });
      return;
    }

    const landmark = await Landmark.findByPk(landmarkId);
    if (!landmark) {
      resWithSend.status(404).sendRes({ message: 'Landmark not found.' });
      return;
    }

    const comment = await Comment.create({ content, userId, landmarkId });
    resWithSend.status(201).sendRes(comment);
  } catch (e) {
    const error =
      e instanceof Error
        ? e
        : new Error('Unknown error while creating comment');
    console.error('Create comment error:', error.message);
    next(error);
  }
};

export const getCommentsByLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const resWithSend = res as CustomResponse;
  try {
    const { landmarkId } = req.params;

    const comments = await Comment.findAll({
      where: { landmarkId },
      include: [{ model: User, attributes: ['id', 'username'] }],
    });

    resWithSend.status(200).sendRes(comments);
  } catch (e) {
    const error =
      e instanceof Error
        ? e
        : new Error('Unknown error while fetching comments');
    console.error('Fetch comments error:', error.message);
    next(error);
  }
};

export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const resWithSend = res as CustomResponse;
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      resWithSend.status(404).sendRes({ message: 'Comment not found.' });
      return;
    }

    if (comment.userId !== userId) {
      resWithSend
        .status(403)
        .sendRes({ message: 'You can only delete your own comments.' });
      return;
    }

    await comment.destroy();
    resWithSend
      .status(204)
      .sendRes({ message: 'Comment deleted successfully.' });
  } catch (e) {
    const error =
      e instanceof Error
        ? e
        : new Error('Unknown error while deleting comment');
    console.error('Delete comment error:', error.message);
    next(error);
  }
};
