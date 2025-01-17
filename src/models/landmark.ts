import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';
import Station from './station';

interface LandmarkAttributes {
  id: number;
  name: string;
  description: string;
  location: string;
  stationId: number;
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
  },
  {
    sequelize,
    modelName: 'Landmark',
  },
);

export default Landmark;
