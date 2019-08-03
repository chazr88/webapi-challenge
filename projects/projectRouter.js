const express = require("express");
const projectData = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", async (req, res,) => {
    try {
        const project = await projectData.get();
        res.status(200).json(project);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the projects"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const project = await projectData.get(req.params.id);

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the project"
        });
    }
});

router.get("/:id/actions", async (req, res) => {
    try {
        const actions = await projectData.getProjectActions(req.params.id);

        if (actions) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({ message: "Actions not found" });
        }
    } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the db"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const project = await projectData.insert(req.body);
        res.status(201).json(project);
    } catch (error) {
        // log error to server
        res.status(500).json({
            message: error
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const project = await projectData.update(req.params.id, req.body);
        if(project) {
            res.status(200).json({ message: "Project updated successfully" });
        } 
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving the db"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const project = await projectData.remove(req.params.id);
        if (project) {
            res.status(200).json({ message: "Project removed" });
        } else {
            res.status(400).json({ message: "Project could not be deleted" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving the db"
        });
    }
});
 

module.exports = router;
