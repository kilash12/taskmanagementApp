import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import DeleteModal from "../components/DeleteModal";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [error, setError] = useState("");

    // Dashboard Data
    const fetchDashboard = async () => {
        try {
            const res = await api.get("/tasks/dashboard/");
            setDashboard(res.data);
        } catch (err) {
            console.log(err);
            setError("Unable to load dashboard.");
        }
    };

    // Task List
    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks/", {
                params: {
                    search,
                    status,
                },
            });

            setTasks(res.data);
        } catch (err) {
            console.log(err);
            setError("Unable to load tasks.");
        }
    };

    // Initial Load
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await fetchDashboard();
            await fetchTasks();

            setLoading(false);
        };

        loadData();
    }, []);

    // Search + Filter
    useEffect(() => {
        fetchTasks();
    }, [search, status]);

    // Delete Task
    const deleteTask = async () => {
        try {
            await api.delete(`/tasks/${deleteId}/`);

            setDeleteId(null);

            fetchDashboard();
            fetchTasks();
        } catch (err) {
            console.log(err);
            setError("Unable to delete task.");
        }
    };

    if (loading) {
        return (
            <h1 className="text-center text-2xl mt-20">
                Loading...
            </h1>
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-3xl font-bold">
                    Welcome {user?.full_name}
                </h1>

                {/* Dashboard Cards */}

                <div className="grid md:grid-cols-4 gap-5 mt-8">

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2>Total Tasks</h2>
                        <p className="text-3xl font-bold mt-2">
                            {dashboard?.total_tasks}
                        </p>
                    </div>

                    <div className="bg-yellow-100 rounded-lg p-6">
                        <h2>Pending</h2>
                        <p className="text-3xl font-bold mt-2">
                            {dashboard?.pending_tasks}
                        </p>
                    </div>

                    <div className="bg-blue-100 rounded-lg p-6">
                        <h2>In Progress</h2>
                        <p className="text-3xl font-bold mt-2">
                            {dashboard?.in_progress_tasks}
                        </p>
                    </div>

                    <div className="bg-green-100 rounded-lg p-6">
                        <h2>Completed</h2>
                        <p className="text-3xl font-bold mt-2">
                            {dashboard?.completed_tasks}
                        </p>
                    </div>

                </div>

                {/* Search & Filter */}

                <div className="flex flex-col md:flex-row gap-4 mt-8">

                    <input
                        type="text"
                        placeholder="Search by Title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-4 py-2 flex-1"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                </div>

                {/* API Error */}

                {error && (
                    <p className="text-red-600 mt-4">
                        {error}
                    </p>
                )}

                {/* Task List */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDelete={setDeleteId}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 text-lg">
                            No Tasks Found.
                        </div>
                    )}

                </div>

            </div>

            <DeleteModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={deleteTask}
            />
        </>
    );
}

export default Dashboard;