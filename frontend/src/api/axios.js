// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:8000/api",
//     baseURL: "https://taskmanagement-backend-es89.onrender.com/api",
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export default api;

import axios from "axios";

const baseURL =
    window.location.hostname === "localhost"
        ? "http://localhost:8000/api"
        : "https://taskmanagement-backend-es89.onrender.com/api";

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;