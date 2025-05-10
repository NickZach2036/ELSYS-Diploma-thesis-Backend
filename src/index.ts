import express from 'express';
import { authRoutes, landmarkRoutes, commentRoutes } from './routes';
import { sequelize, sendRes } from './utils';
import { User, Landmark, Station, Comment } from './models';

const app = express();
const PORT = process.env.PORT || 2999;

app.use(express.json());
app.use(sendRes);

app.use('/auth', authRoutes);
app.use('/landmarks', landmarkRoutes);
app.use('/comments', commentRoutes);

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
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
