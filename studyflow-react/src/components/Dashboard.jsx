import StatCard from "./StatCard";

function Dashboard({ total, completed, pending }) {
    return (
        <section>
            <h2>Dashboard</h2>

            <div className="stats">

                <StatCard
                    title="Total Tasks"
                    value={total}
                />

                <StatCard
                    title="Completed"
                    value={completed}
                />

                <StatCard
                    title="Pending"
                    value={pending}
                />

            </div>
        </section>
    );
}

export default Dashboard;