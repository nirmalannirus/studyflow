function TaskCard({ task, onToggle, onDelete, onEdit }) {
    return (
        <article className="task-card">

            <h3>{task.title}</h3>

            <p>Subject: {task.subject}</p>

            <p>Priority: {task.priority}</p>

            <p>
                Due Date: {task.dueDate || "No due date"}
            </p>

            <p>
                Status: {task.completed ? "Completed" : "Pending"}
            </p>

            <button onClick={() => onToggle(task._id)}>
                {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => onEdit(task._id)}>
                Edit
            </button>

            <button onClick={() => onDelete(task._id)}>
                Delete
            </button>

        </article>
    );
}

export default TaskCard;