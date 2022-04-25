import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json())

import { authorizedMiddleware } from "./middleware/authorization.mjs";
import { deleteTaskController, getTaskController, postTaskController, putTaskController } from "./controllers/tasksControllers.mjs";

app.get("/api/v0.0/tasks/",getTaskController);
app.post("/api/v0.0/task/",postTaskController)
app.put("/api/v0.0/task/",putTaskController)
app.delete("/api/v0.0/task/",deleteTaskController)

app.listen(PORT,()=>{
    console.log("Express running...");
})