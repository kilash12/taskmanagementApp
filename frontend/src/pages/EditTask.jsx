import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import api from "../api/axios";

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending",
    });

    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch Task
    const fetchTask = async () => {
        try {
            setPageLoading(true);

            const res = await api.get(`/tasks/${id}/`);

            setTask({
                title: res.data.title,
                description: res.data.description,
                status: res.data.status,
            });

            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load task.");
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    // Update Task
    const updateTask = async (formData) => {
        try {
            setLoading(true);

            await api.put(`/tasks/${id}/`, formData);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Failed to update task.");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-[70vh]">
                    <h1 className="text-2xl font-semibold">
                        Loading...
                    </h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10 px-4">

                <div className="max-w-2xl mx-auto">

                    <h1 className="text-3xl font-bold mb-6">
                        Edit Task
                    </h1>

                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <TaskForm
                        initialData={task}
                        onSubmit={updateTask}
                        loading={loading}
                        buttonText="Update Task"
                    />

                </div>

            </div>
        </>
    );
}

export default EditTask;