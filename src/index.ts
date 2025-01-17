import express from 'express';
import { authRoutes } from './routes';
import { sequelize } from './utils';
import { User, Landmark, Station, Comment } from './models';

const app = express();
const PORT = process.env.PORT || 2999;

app.use(express.json());
app.use('/auth', authRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
  })
  .catch((err) => console.error('Unable to connect to database:', err));
