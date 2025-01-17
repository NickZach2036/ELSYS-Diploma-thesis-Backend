import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

interface StationAttributes {
  id: number;
  name: string;
  location: string;
}

type StationCreationAttributes = Optional<StationAttributes, 'id'>;

class Station
  extends Model<StationAttributes, StationCreationAttributes>
  implements StationAttributes
{
  public id!: number;
  public name!: string;
  public location!: string;
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
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Station',
  },
);

export default Station;
