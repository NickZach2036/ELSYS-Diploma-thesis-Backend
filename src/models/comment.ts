import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';
import User from './user';
import Landmark from './landmark';

interface CommentAttributes {
  id: number;
  content: string;
  userId: number;
  landmarkId: number;
  createdAt?: Date;
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public content!: string;
  public userId!: number;
  public landmarkId!: number;
  public readonly createdAt!: Date;
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
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    landmarkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Landmark,
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  },
);

export default Comment;
