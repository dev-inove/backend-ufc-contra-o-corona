const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const ActionController = require('./app/controllers/ActionController');
const SessionController = require('./app/controllers/SessionController');

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/', (req, res) => {
  return res.send('Root');
});
routes.post('/users', UserController.store);
// routes.use(authMiddleware);

routes.post('/actions', ActionController.store);
routes.get('/action', ActionController.show);
routes.get('/actions', ActionController.index);
routes.put('/actions', ActionController.update);
routes.delete('/actions', ActionController.destroy);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

// routes.put('/actions/:id', ActionController.update);
// routes.delete('/actions/:id', ActionController.destroy);

module.exports = routes;
