const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const ActionController = require('./app/controllers/ActionController');
const CategoryController = require('./app/controllers/CategoryController');
const FilterController = require('./app/controllers/FilterController');
const SessionController = require('./app/controllers/SessionController');

const multer = require('multer');
const { upload } = require('./config/fileupload');
// const upload = multer(uploadConfig.upload);

const routes = new Router();

routes.post('/actions2', upload.single('file'), ActionController.store);

routes.post('/sessions', SessionController.store);

routes.get('/', (req, res) => {
  return res.send('Root');
});
routes.post('/users', UserController.store);
routes.post('/action/filter', FilterController.show);

// -----------------------------------------------------------
// routes.use(authMiddleware);

routes.post('/actions', upload.single('file'), ActionController.store);
routes.get('/action', ActionController.show);
routes.get('/actions', ActionController.index);
routes.put('/actions', ActionController.update);
routes.delete('/actions', ActionController.destroy);
routes.get('/infos', ActionController.numberDocsWithResult);

routes.post('/category', CategoryController.store);
routes.get('/category', CategoryController.show);
routes.get('/categories', CategoryController.index);
routes.put('/category', CategoryController.update);
routes.delete('/category', CategoryController.destroy);
routes.get('/category-infos', CategoryController.NumberDoneCategory);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

// routes.put('/actions/:id', ActionController.update);
// routes.delete('/actions/:id', ActionController.destroy);

module.exports = routes;
