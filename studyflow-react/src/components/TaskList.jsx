import TaskCard from "./TaskCard";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    return (
        <section id="tasks">

            <h2>My Tasks</h2>

            <div id="task-list">

                {tasks.length === 0 ? (
                    <p>No tasks found.</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                )}

            </div>

        </section>
    );
}

export default TaskList;