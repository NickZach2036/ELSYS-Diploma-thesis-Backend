import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

interface UserAttributes {
  id?: number;
  username?: string;
  password?: string;
  walkingDistanceMinutes?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, keyof UserAttributes>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id?: number;
  public username?: string;
  public password?: string;
  public walkingDistanceMinutes?: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
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
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    walkingDistanceMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  },
);

export default User;
