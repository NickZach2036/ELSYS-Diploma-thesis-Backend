import express from 'express';
import {
  authRoutes,
  landmarkRoutes,
  commentRoutes,
  stationRoutes,
} from './routes';
import { sequelize, sendRes } from './utils';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(sendRes);

app.use('/auth', authRoutes);
app.use('/stations', stationRoutes);
app.use('/landmarks', landmarkRoutes);
app.use('/comments', commentRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
