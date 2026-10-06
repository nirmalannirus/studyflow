import ClaySelect from "./ClaySelect";
import ClayDatePicker from "./ClayDatePicker";
import { useState } from "react";

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "" || subject.trim() === "") {
            alert("Please enter title and subject.");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title,
            subject: subject,
            priority: priority,
            dueDate: dueDate,
            completed: false
        };

        onAddTask(newTask);

        setTitle("");
        setSubject("");
        setPriority("Low");
        setDueDate("");
    }

    return (
        <section id="add-task">
            <h2>Add New Task</h2>

            <form id="task-form" onSubmit={handleSubmit}>

                <label htmlFor="title">
                    Task Title
                </label>

                <input
                    type="text"
                    id="title"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />

                <label htmlFor="subject">
                    Subject
                </label>

                <input
                    type="text"
                    id="subject"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(event) =>
                        setSubject(event.target.value)
                    }
                />

                <label htmlFor="priority">
                    Priority
                </label>

                <ClaySelect
                    value={priority}
                    onChange={setPriority}
                    options={[
                        { value: "Low", label: "Low" },
                        { value: "Medium", label: "Medium" },
                        { value: "High", label: "High" }
                    ]}
                />

                <label htmlFor="due-date">
                    Due Date
                </label>

                <ClayDatePicker
                    value={dueDate}
                    onChange={setDueDate}
                />

                <button type="submit">
                    Add Task
                </button>

            </form>
        </section>
    );
}

export default TaskForm;