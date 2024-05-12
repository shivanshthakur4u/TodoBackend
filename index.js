require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = express.Router();
const userRouter = express.Router();
const taskController = require("./controller/task");
const authRoutes = require("./routes/auth");
var cors = require("cors");
// middlewares
app.use(express.json()); // body-parser
app.use("/", taskRouter); // tasks routes
app.use("/user", userRouter); // user routes
app.use(cors());

// DB Connection

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://boylikes2play:${process.env.DB_PASSWORD}@todoapp.l9hs3ur.mongodb.net/?retryWrites=true&w=majority&appName=TodoApp`
  );
  // console.log("DB Connected");
}

// Endpoints
app
  .post("/addTask", taskController.createTask)
  .get("/getTasks", taskController.getAllTasks)
  .get("/getTask/:id", taskController.getTaskById)
  .put("/updateTask/:id", taskController.updatetaskById)
  .delete("/deleteTask/:id", taskController.deletetaskById);

  app.post("/user/register", authRoutes.createUser)
     .post("/user/signin", authRoutes.signin)

app.listen( () => {
  console.log(`server Started`);
});

