const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
require("dotenv").config();



const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("StudyFlow API is running");
});


app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find().sort({
            createdAt: -1
        });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get tasks"
        });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            subject: req.body.subject,
            priority: req.body.priority,
            dueDate: req.body.dueDate || "",
            completed: false
        });

        res.status(201).json(newTask);

    } catch (error) {
        res.status(400).json({
            message: "Failed to create task"
        });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(updatedTask);

    } catch (error) {
        res.status(400).json({
            message: "Failed to update task"
        });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to delete task"
        });
    }
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});