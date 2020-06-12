const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const ActionController = require('./app/controllers/ActionController');
const NeedController = require('./app/controllers/NeedController');
const NotificationController = require('./app/controllers/NotificationController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.use(authMiddleware);

routes.get('/test', (req, res) => {
  return res.json({ helo: 'world' });
});

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

module.exports = routes;
