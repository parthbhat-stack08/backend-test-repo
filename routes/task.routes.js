
const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} = require("../controllers/task.controller");

router.post("/", createTask);
router.get("/", getTasks);

// Keep stats before /:id
router.get("/stats", getTaskStats);

router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
