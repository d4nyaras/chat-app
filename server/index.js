const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./Routes/AuthRoute");
const messageRoutes = require("./Routes/MessageRoute");
const userRoutes = require("./Routes/UserRoute");
const chatRoutes = require("./Routes/ChatRoute");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(` Server running on port: ${port}`);
});
