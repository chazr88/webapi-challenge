const express = require("express");
const actionData = require("../data/helpers/actionModel");
const projectData = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", async (req, res,) => {
    try {
        const action = await actionData.get();
        res.status(200).json(action);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the actions"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const action = await actionData.get(req.params.id);

        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "action not found" });
        }
    } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the action"
        });
    }
});

router.post("/", validateProjectId, async (req, res) => {
    try {
        const action = await actionData.insert(req.body);
        res.status(201).json(action);
    } catch (error) {
        // log error to server
        res.status(500).json({
            message: error
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const action = await actionData.update(req.params.id, req.body);
        if(action) {
            res.status(200).json({ message: "Action updated successfully" });
        } 
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving the db"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const action = await actionData.remove(req.params.id);
        if (action) {
            res.status(200).json({ message: "Action removed" });
        } else {
            res.status(400).json({ message: "Action could not be deleted" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving the db"
        });
    }
});

async function validateProjectId(req, res, next) {
    try {
        const id = req.body.project_id
        const project = await projectData.get(id);

        if (project) {
            next();
        } else {
            res.status(404).json({ message: "Invalid project id" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

 

module.exports = router;
