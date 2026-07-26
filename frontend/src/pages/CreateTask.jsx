import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import api from "../api/axios";

function CreateTask() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const createTask = async (formData) => {
        try {
            setLoading(true);

            await api.post("/tasks/", formData);

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert("Failed to create task.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10 px-4">

                <TaskForm
                    buttonText="Create Task"
                    loading={loading}
                    onSubmit={createTask}
                />

            </div>
        </>
    );
}

export default CreateTask;