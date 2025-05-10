import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';
import User from './user';
import Landmark from './landmark';

interface CommentAttributes {
  id?: number;
  content?: string;
  userId?: number;
  landmarkId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type CommentCreationAttributes = Optional<
  CommentAttributes,
  keyof CommentAttributes
>;

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id?: number;
  public content?: string;
  public userId?: number;
  public landmarkId?: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    landmarkId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Landmark,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
    indexes: [{ fields: ['userId'] }, { fields: ['landmarkId'] }],
  },
);

export default Comment;
