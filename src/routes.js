const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const ActionController = require('./app/controllers/ActionController');
const NeedController = require('./app/controllers/NeedController');

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

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

module.exports = routes;
