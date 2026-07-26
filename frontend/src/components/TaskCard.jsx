import { Link } from "react-router-dom";

function TaskCard({ task, onDelete }) {

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "In Progress":
                return "bg-blue-100 text-blue-700";

            case "Completed":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">

            {/* Header */}

            <div className="flex justify-between items-start">

                <h2 className="text-xl font-semibold text-gray-800">
                    {task.title}
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}
                >
                    {task.status}
                </span>

            </div>

            {/* Description */}

            <p className="mt-3 text-gray-600">
                {task.description}
            </p>

            {/* Created Date */}

            <p className="mt-4 text-sm text-gray-500">
                <strong>Created:</strong>{" "}
                {task.created_at
                    ? new Date(task.created_at).toLocaleDateString("en-IN")
                    : "-"}
            </p>

            {/* Buttons */}

            <div className="mt-5 flex gap-3">

                <Link
                    to={`/edit-task/${task.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    Edit
                </Link>

                <button
                    onClick={() => onDelete(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TaskCard;