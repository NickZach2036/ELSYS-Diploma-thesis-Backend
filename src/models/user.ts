import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  createdAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

export default User;
