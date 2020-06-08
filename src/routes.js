const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const UserController = require('./app/controllers/UserController');
const FileController = require('./app/controllers/FileController');
const ActionController = require('./app/controllers/ActionController');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/actions', ActionController.store);
routes.get('/actions/:id', ActionController.show);
routes.get('/actions', ActionController.index);
routes.put('/actions/:id', ActionController.update);
routes.delete('/actions/:id', ActionController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
