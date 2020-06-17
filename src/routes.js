const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const ActionController = require('./app/controllers/ActionController');
const NeedController = require('./app/controllers/NeedController');
const NotificationController = require('./app/controllers/NotificationController');
const SessionController = require('./app/controllers/SessionController');
const ProductionController = require('./app/controllers/ProductionController');
const ProductionDataController = require('./app/controllers/ProductionDataController');
const DistribuitionLocationController = require('./app/controllers/DistribuitionLocationController');

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

//routes.use(authMiddleware);

routes.post('/actions', ActionController.store);
routes.get('/actions/:id', ActionController.show);
routes.get('/actions', ActionController.index);
routes.put('/actions/:id', ActionController.update);
routes.delete('/actions/:id', ActionController.destroy);

routes.post('/needs', NeedController.store);
routes.get('/needs/:id', NeedController.show);
routes.get('/needs', NeedController.index);
routes.put('/needs/:id', NeedController.update);
routes.delete('/needs/:id', NeedController.destroy);

routes.post('/notifications', NotificationController.store);
routes.get('/notifications', NotificationController.index);
routes.delete('/notifications/:id', NotificationController.destroy);

routes.post('/productions', ProductionController.store);
routes.get('/productions', ProductionController.index);
routes.get('/productions/:id', ProductionController.show);
routes.delete('/productions/:id', ProductionController.destroy);

routes.post('/production_data', ProductionDataController.store);
routes.get('/production_data', ProductionDataController.index);
routes.delete('/production_data/:id', ProductionDataController.destroy);

routes.post('/dist_location', DistribuitionLocationController.store);
routes.delete('/dist_location/:id', DistribuitionLocationController.destroy);

module.exports = routes;
