function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6">

                <h2 className="text-2xl font-bold text-red-600">
                    Delete Task
                </h2>

                <p className="mt-4 text-gray-600">
                    Are you sure you want to delete this task?
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default DeleteModal;