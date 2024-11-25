const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/');
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${uuid()}.${fileExtension}`);
    }
});

const upload = multer({ storage });

router.post('/create', authMiddleware, upload.single('image'), createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', authMiddleware, roleMiddleware(['superAdmin', 'admin', 'user', 'moderator']), upload.single('image'), updateProject);
router.delete('/:id', authMiddleware, roleMiddleware(['superAdmin']), deleteProject);

module.exports = router;
