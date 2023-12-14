const router = require('express').Router();
const { getAllUsers, createUser, getUserById } = require('../controllers/userController');

router.get('/users', getAllUsers);
router.post('/user', createUser);
router.get('/user/:id', getUserById);

module.exports = router;