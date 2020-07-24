const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const ActionController = require('./app/controllers/ActionController');
const SessionController = require('./app/controllers/SessionController');

const NotificationController = require('./app/controllers/NotificationController');

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/', (req, res) => {
  return res.send('hello');
});

routes.post('/users', UserController.store);

routes.get('/actions/:id', ActionController.show);
routes.get('/actions', ActionController.index);

// routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/actions', ActionController.store);
routes.put('/actions/:id', ActionController.update);
routes.delete('/actions/:id', ActionController.destroy);

routes.post('/notifications', NotificationController.store);

module.exports = routes;
