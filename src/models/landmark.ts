import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';
import Station from './station';

interface LandmarkAttributes {
  id: number;
  name: string;
  description: string;
  location: string;
  stationId: number;
  distanceFromStation: number; // in meters
  createdAt?: Date;
  updatedAt?: Date;
}

type LandmarkCreationAttributes = Optional<LandmarkAttributes, 'id'>;

class Landmark
  extends Model<LandmarkAttributes, LandmarkCreationAttributes>
  implements LandmarkAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public location!: string;
  public stationId!: number;
  public distanceFromStation!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Landmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Station,
        key: 'id',
      },
    },
    distanceFromStation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Landmark',
    timestamps: true,
  },
);

export default Landmark;
