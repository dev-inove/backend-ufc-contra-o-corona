const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const ActionController = require('./app/controllers/ActionController');
const SessionController = require('./app/controllers/SessionController');
const ProductionController = require('./app/controllers/ProductionController');
const ProductionDataController = require('./app/controllers/ProductionDataController');

const NotificationController = require('./app/controllers/NotificationController');

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/', (req, res) => {
  return res.send('hello');
});

routes.get('/action', ActionController.show);
routes.get('/actions', ActionController.index);
routes.put('/actions', ActionController.update);
routes.delete('/actions', ActionController.destroy);

routes.post('/users', UserController.store);
// routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/actions', ActionController.store);
// routes.put('/actions/:id', ActionController.update);
// routes.delete('/actions/:id', ActionController.destroy);

routes.post('/notifications', NotificationController.store);

routes.post('/productions', ProductionController.store);
routes.get('/productions', ProductionController.index);
routes.get('/production', ProductionController.show);
routes.put('/productions', ProductionController.update);
routes.delete('/productions', ProductionController.destroy);

routes.post('/production_data', ProductionDataController.store);
routes.get('/production_data/:id', ProductionDataController.index);
routes.put('/production_data/:id', ProductionDataController.update);
routes.delete('/production_data/:id', ProductionDataController.destroy);

module.exports = routes;
