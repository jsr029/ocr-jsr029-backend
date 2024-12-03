const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');
const uuid = require('uuid').v4;

exports.createProject = async (req, res) => {
    const { title, appUrl, techno, description } = req.body;
    const userId = req.auth.userId;
    const image = req.file.path;

    try {
        const project = new Project({ image, title, appUrl, techno, description, userId });
        await project.save();
        res.status(201).json({ message: 'Project created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('userId', 'email',
            {
              access: "public",
            });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('userId', 'email');
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProject = async (req, res) => {
    const { title, appUrl, techno, description } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });

       /* if (image) {
            // Delete the old image if exists
            if (project.image) {
                if(path.join(__dirname, '..', project.image)){
                fs.unlinkSync(path.join(__dirname, '..', project.image));
                }else{
                    project.image = null
                }
            }
            project.image = image;
        }*/
        project.image = image || project.image;
        project.title = title || project.title;
        project.appUrl = appUrl || project.appUrl;
        project.techno = techno || project.techno;
        project.description = description || project.description;

        await project.save();
        res.json({ message: 'Project updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            if (project.image) {
                const imagePath = path.join(__dirname, '..', project.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.log('Image file does not exist:', imagePath);
                }
            }
            await Project.findByIdAndDelete(req.params.id);
            res.json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
