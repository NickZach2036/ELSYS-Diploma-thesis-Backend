import User from './user';
import Landmark from './landmark';
import Station from './station';
import Comment from './comment';

Landmark.belongsTo(Station, { foreignKey: 'stationId' });
Station.hasMany(Landmark, { foreignKey: 'stationId' });

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Comment.belongsTo(Landmark, { foreignKey: 'landmarkId' });
Landmark.hasMany(Comment, { foreignKey: 'landmarkId' });

export { User, Landmark, Station, Comment };
