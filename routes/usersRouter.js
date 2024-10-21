const { Router } = require('express');
const multer = require('multer');
const { usersController } = require('../controllers');

const upload = multer({ dest: 'public/images/' });

const usersRouter = Router();

usersRouter
  .route('/')
  .post(usersController.createUser)
  .get(usersController.getUsers);

usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

usersRouter.get('/:userId/tasks', usersController.getUsersTasks);

usersRouter.patch('/:userId/images', upload.single('userPhoto'));

module.exports = usersRouter;
