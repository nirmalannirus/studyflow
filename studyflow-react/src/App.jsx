import SearchFilter from "./components/SearchFilter";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


function App() {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchTasks();
    }, []);
    async function fetchTasks() {
    try {
          const response = await fetch(
                "http://localhost:5000/api/tasks"
          );

          const data = await response.json();

          setTasks(data);

        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }
    async function addTask(newTask) {
        try {
            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTask)
                }
            );

            const savedTask = await response.json();

            setTasks((currentTasks) => [
                savedTask,
                ...currentTasks
            ]);

        } catch (error) {
            console.error("Failed to add task:", error);
        }
    }

    async function toggleTask(id) {
        try {
            const task = tasks.find(
                (task) => task._id === id
            );

            if (!task) return;

            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        completed: !task.completed
                    })
                }
            );

            const updatedTask = await response.json();

            setTasks(
                tasks.map((task) =>
                    task._id === id
                        ? updatedTask
                        : task
                )
            );

        } catch (error) {
            console.error(
                "Failed to update task:",
                error
            );
        }
    }

    async function deleteTask(id) {
        const confirmed = confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            setTasks(
                tasks.filter(
                    (task) => task._id !== id
                )
            );

        } catch (error) {
            console.error(
                "Failed to delete task:",
                error
            );
        }
    }
    async function editTask(id) {
        const task = tasks.find(
            (task) => task._id === id
        );

        if (!task) return;

        const newTitle = prompt(
            "Edit task title:",
            task.title
        );

        if (newTitle === null) return;

        const cleanTitle = newTitle.trim();

        if (cleanTitle === "") {
            alert("Task title cannot be empty.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: cleanTitle
                    })
                }
            );

            const updatedTask = await response.json();

            setTasks(
                tasks.map((task) =>
                    task._id === id
                        ? updatedTask
                        : task
                )
            );

        } catch (error) {
            console.error(
                "Failed to edit task:",
                error
            );
        }
    }


    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks =
        tasks.length - completedTasks;

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            task.subject
                .toLowerCase()
                .includes(search.toLowerCase());


        let matchesFilter = true;


        if (filter === "completed") {
            matchesFilter = task.completed;
        }

        if (filter === "pending") {
            matchesFilter = !task.completed;
        }


        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <Header />

            <main>
                <Dashboard
                    total={tasks.length}
                    completed={completedTasks}
                    pending={pendingTasks}
                />
                <TaskForm onAddTask={addTask} />
                <SearchFilter
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                />
                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                />
            </main>
        </>
    );
}

export default App;