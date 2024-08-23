const express = require("express");
const Task = require("../models/article");
const auth = require("../middleware/auth");
const router = express.Router();

//create new task
router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//get tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//get one task
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id: _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Not Found Or That's Belongs To You");
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//update task
router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const keys = Object.keys(req.body);
    const task = await Task.findOne({ _id: _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Not Found Or That's Belongs To You");
    }
    keys.forEach((e) => {
      task[e] = req.body[e];
    });

    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//delete
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.deleteOne({ _id: _id, owner: req.user._id });
    if (!task.deletedCount) {
      return res.status(404).send("Not Found Or That's Belongs To You");
    }
    res.send();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
