
const Task = require("../models/task.model");
const mongoose = require("mongoose");

// CREATE TASK
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS + FILTER + SEARCH + SORT + PAGINATION

exports.getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      search,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i"
      };
    }

    const allowedSortFields = ["createdAt"];
    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const sortOrder = order === "asc" ? 1 : -1;

    const currentPage = Math.max(1, Number(page) || 1);
    const pageLimit = Math.max(1, Math.min(100, Number(limit) || 10));
    const skip = (currentPage - 1) * pageLimit;

    const totalTasks = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(pageLimit);

    // Handle empty tasks
    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No tasks found",
        data: []
      });
    }

    res.status(200).json({
      success: true,
      currentPage,
      totalPages: Math.ceil(totalTasks / pageLimit),
      totalTasks,
      limit: pageLimit,
      data: tasks
    });

  } catch (error) {
    next(error);
  }
};

// GET SINGLE TASK
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// TASK STATISTICS
exports.getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const data = {
      totalTasks: 0,
      pending: 0,
      inProgress: 0,
      completed: 0
    };

    stats.forEach((item) => {
      data.totalTasks += item.count;

      if (item._id === "pending") data.pending = item.count;
      if (item._id === "in-progress") data.inProgress = item.count;
      if (item._id === "completed") data.completed = item.count;
    });

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};



/*
========================================
       TASK MANAGEMENT API
          POSTMAN ROUTES
========================================

BASE URL:
http://localhost:5000/api/tasks


1. CREATE TASK
POST
http://localhost:5000/api/tasks

BODY:
{
  "title": "Learn Node.js",
  "description": "Complete backend development",
  "status": "pending",
  "priority": "high",
  "assignedTo": "Parth",
  "dueDate": "2026-12-10"
}


2. GET ALL TASKS
GET
http://localhost:5000/api/tasks


3. GET SINGLE TASK
GET
http://localhost:5000/api/tasks/PASTE_ID


4. UPDATE TASK
PUT
http://localhost:5000/api/tasks/PASTE_ID

BODY:
{
  "title": "Learn Express",
  "description": "Complete Express API",
  "status": "in-progress",
  "priority": "medium",
  "assignedTo": "Parth"
}


5. DELETE TASK
DELETE
http://localhost:5000/api/tasks/PASTE_ID


6. FILTER BY STATUS
GET
http://localhost:5000/api/tasks?status=pending


7. FILTER BY PRIORITY
GET
http://localhost:5000/api/tasks?priority=high


8. COMBINED FILTER
GET
http://localhost:5000/api/tasks?status=pending&priority=high


9. SEARCH TASK
GET
http://localhost:5000/api/tasks?search=node


10. SORT TASKS
GET
http://localhost:5000/api/tasks?sortBy=createdAt&order=asc


11. PAGINATION
GET
http://localhost:5000/api/tasks?page=1&limit=5


12. COMBINED QUERY
GET
http://localhost:5000/api/tasks?status=pending&priority=high&search=node&sortBy=createdAt&order=desc&page=1&limit=5


13. TASK STATISTICS
GET
http://localhost:5000/api/tasks/stats

========================================
*/
