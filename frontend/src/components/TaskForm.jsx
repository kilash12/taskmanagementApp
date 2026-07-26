import { useState, useEffect } from "react";

const defaultData = {
    title: "",
    description: "",
    status: "Pending",
};

function TaskForm({
    initialData = defaultData,
    onSubmit,
    loading = false,
    buttonText = "Save Task",
}) {
    const [formData, setFormData] = useState(defaultData);

    useEffect(() => {
        setFormData(initialData || defaultData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.title.trim() === "" ||
            formData.description.trim() === ""
        ) {
            alert("Title and Description are required.");
            return;
        }

        onSubmit({
            title: formData.title.trim(),
            description: formData.description.trim(),
            status: formData.status,
        });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">

            <h2 className="text-2xl font-bold text-center mb-6">
                {buttonText === "Create Task"
                    ? "Create Task"
                    : "Edit Task"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Title */}

                <div>
                    <label className="block mb-2 font-medium">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}

                <div>
                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        required
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Status */}

                <div>
                    <label className="block mb-2 font-medium">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-semibold ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Please wait..." : buttonText}
                </button>

            </form>

        </div>
    );
}

export default TaskForm;