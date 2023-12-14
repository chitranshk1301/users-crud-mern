const router = require('express').Router();
const { getAllUsers, createUser, getUserById, updateUserById, deleteUser } = require('../controllers/userController');

router.get('/users', getAllUsers);
router.post('/user', createUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUserById);
router.delete('/user/:id', deleteUser)

module.exports = router;