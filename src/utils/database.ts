import { Sequelize } from 'sequelize';
import constants from '../constants';

const sequelize = new Sequelize(
  constants.POSTGRES_DB,
  constants.POSTGRES_USER,
  constants.POSTGRES_PASSWORD,
  {
    host: constants.POSTGRES_HOST,
    port: Number(constants.DATABASE_PORT),
    dialect: 'postgres',
  },
);

export default sequelize;
