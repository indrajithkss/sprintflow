const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { protect } = require("../middleware/auth.middleware");

// Protect all task routes
router.use(protect);

// GET all tasks
router.get("/", getTasks);

// POST create task
router.post("/", createTask);

// PUT update task
router.put("/:id", updateTask);

// DELETE task
router.delete("/:id", deleteTask);

module.exports = router;