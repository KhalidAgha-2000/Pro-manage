const projectModel = require('../model/projects')
const teamModel = require('../model/team')

class Controller {
    // -------------------- Fetch All Projects
    async allProjects(req, res, next) {
        try {
            //Archived / not Archived
            const isArchived = req.query.isArchived === 'true'; // convert query parameter to boolean
            const query = isArchived ? { 'archive.archived': true } : { 'archive.archived': false };
            const projects = await projectModel.find(query).populate('team');

            // const projects = await projectModel.find({}).populate('team');
            const projectData = projects.map(projj => ({
                _id: projj._id,
                name: projj.name,
                archive: projj.archive,
                status: projj.in_progress,
                team: projj.team._id,
                teamName: projj.team.name,
                numberOfEmployees: projj.team.employees.length,
                numberOfProjectOfTheTeam: projj.team.projects.length,
            }));
            res.status(200).json({ success: true, message: 'Projects', data: projectData, });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Fetch Specific Project
    async specificProject(req, res, next) {
        try {

            const project = await projectModel.findById(req.params.id).populate('team')
            // .populate({ path: 'team', select: 'name employees' })
            // .select('-team.projects');
            let data = {
                // const projects = await projectModel.find({}).populate('team');
                _id: project._id,
                name: project.name,
                archive: project.archive.archived,
                archiveDate: project.archive.arcivedDate,
                status: project.in_progress,
                team: project.team._id,
                teamName: project.team.name,
                teamemployees: project.team.employees.map(emp => ({
                    _id: emp._id,
                    first_name: emp.first_name,
                    last_name: emp.last_name,
                    email: emp.email,
                    Employee_Name: emp.Employee_Name,
                })),
                numberOfEmployees: project.team.employees.length,
                numberOfProjectOfTheTeam: project.team.projects.length,

            }

            res.status(200).json({ success: true, message: 'Project Information!', data: data });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Add Kpi
    async addProject(req, res, next) {

        // Check if the Project name is already in the database 
        const projectExists = await projectModel.findOne({ name: req.body.name })
        if (projectExists) {
            // 409 Conflict
            return res.status(409).json({ success: false, message: "Project already exists" })
        }

        const team = await teamModel.findById({ _id: req.body.teamID })

        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }

        const newProject = new projectModel({
            team: req.body.teamID,
            name: req.body.name.toLowerCase(),
        });

        // Save new KPI to database
        try {
            const savedProject = await newProject.save();
            return res.status(201).json({ success: true, message: "New Project added successfully", data: savedProject });
        } catch (error) {
            next(error)
        }

    }

    // -------------------- Update Project Name
    async updateProjectName(req, res, next) {

        try {
            const project = await projectModel.findById({ _id: req.params.id })

            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }

            // Check if the request body is empty
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ success: false, message: "You must add Project name" });
            }

            // Check if the name already exists
            const projectExists = await projectModel.findOne({ name: req.body.name });
            if (projectExists) {
                return res.status(400).json({ message: 'Project already exists' });
            }

            // Update the admin by ID
            const newProjectData = await projectModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: newProjectData });
        } catch (err) {
            next(err)
        }

    }

    // -------------------- Change Project Status
    async changeProjectStatus(req, res, next) {
        try {
            const project = await projectModel.findById({ _id: req.params.id })

            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }

            // Update the Project by ID
            const in_progress = project.in_progress;
            const newProjectData = await projectModel.findByIdAndUpdate(
                req.params.id,
                { $set: { in_progress: !in_progress } },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: newProjectData });
        } catch (err) {
            next(err)
        }
    }

    // Remove Project to Archive
    async archiveProject(req, res, next) {
        try {
            const project = await projectModel.findById({ _id: req.params.id })

            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }
            if (project.archive.archived) {
                return res.status(400).json({ success: false, message: "Project is already archived" });
            }
            // Archive the Project by ID
            const newProjectData = await projectModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        'archive.archived': true,
                        'archive.arcivedDate': new Date().toDateString()
                    }
                },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Project Removed to Archive successfully', data: newProjectData });
        } catch (err) {
            next(err)
        }
    }
}




const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 