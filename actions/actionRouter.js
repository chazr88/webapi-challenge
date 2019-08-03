const express = require("express");
const actionData = require("../data/helpers/actionModel");

const router = express.Router();

// router.get("/", async (req, res,) => {
//     try {
//         const action = await actionData.get(req.query);
//         res.status(200).json(action);
//     } catch (error) {
//         // log error to database
//         console.log(error);
//         res.status(500).json({
//             message: "Error retrieving the action"
//         });
//     }
// });

// router.post("/", async (req, res) => {
//     try {
//         const project = await actionData.insert(req.body);
//         res.status(201).json(project);
//     } catch (error) {
//         // log error to server
//         res.status(500).json({
//             message: error
//         });
//     }
// });

module.exports = router;
