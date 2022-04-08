const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const {
  validateUserById, validateUpdateUserInfo, validateupdateUserAvatar,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);
router.patch('/me/avatar', validateupdateUserAvatar, updateUserAvatar);
router.get('/:userId', validateUserById, getUserById);

module.exports = router;
