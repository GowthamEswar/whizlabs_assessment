import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000"; // Replace with your server URL

export const socket = io(SOCKET_URL, {
  withCredentials: true,
});

export const connectSocket = (userId: string) => {
  socket.emit("setup", { _id: userId });
};