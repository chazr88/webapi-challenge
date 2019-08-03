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
            res.status(404).json({ message: "project not found" });
        }
    } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the project"
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

module.exports = router;
