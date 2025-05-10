import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

interface StationAttributes {
  id?: number;
  name?: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type StationCreationAttributes = Optional<
  StationAttributes,
  keyof StationAttributes
>;

class Station
  extends Model<StationAttributes, StationCreationAttributes>
  implements StationAttributes
{
  public id?: number;
  public name?: string;
  public location?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Station.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Station',
    timestamps: true,
  },
);

export default Station;
