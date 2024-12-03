const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const fs = require('fs');
const path = require('path');
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
        const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const dir = path.join('assets', date); // Create the subfolder path
 // Check if directory exists, if not, create it 
 if (!fs.existsSync(dir))
     { 
        fs.mkdirSync(dir, { recursive: true }); 
    }
        cb(null, dir);
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
router.patch('/:id', authMiddleware, roleMiddleware(['superAdmin', 'admin', 'user', 'moderator']), upload.single('image'), updateProject);
router.delete('/:id', authMiddleware, roleMiddleware(['superAdmin', 'admin']), deleteProject);

module.exports = router;
