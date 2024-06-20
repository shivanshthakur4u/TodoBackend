require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = express.Router();
const userRouter = express.Router();
const taskController = require("./controller/task");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
var cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors());

// DB Connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://boylikes2play:${process.env.DB_PASSWORD}@todoapp.l9hs3ur.mongodb.net/?retryWrites=true&w=majority&appName=TodoApp`
  );
}

// Endpoints
app.post("/user/register", authRoutes.createUser);
app.post("/user/signin", authRoutes.signin);

taskRouter.use(authMiddleware);
taskRouter.post("/addTask", taskController.createTask);
taskRouter.get("/getTasks", taskController.getAllTasks);
taskRouter.get("/getTask/:id", taskController.getTaskById);
taskRouter.put("/updateTask/:id", taskController.updatetaskById);
taskRouter.delete("/deleteTask/:id", taskController.deletetaskById);

app.use("/tasks", taskRouter);

app.listen(4000, () => {
  console.log(`Server started`);
});
