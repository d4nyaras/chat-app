import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust to match backend

export default socket;
