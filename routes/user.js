const express = require('express');
const {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authMiddleware, roleMiddleware(['superAdmin']), getAllUsers);
router.get('/:id', authMiddleware, roleMiddleware(['superAdmin']), getUserById);
router.put('/:id', authMiddleware, roleMiddleware(['superAdmin']), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware(['superAdmin']), deleteUser);

module.exports = router;
