import express from "express";
const app = express();
const PORT = 3000;
const PATH_PREFIX = "/api/v0.0";

import { authMiddleware } from "./middleware/authorization.mjs";
import { requestLog } from "./middleware/requestsLog.mjs";

import { postUserController } from "./controllers/usersControllers.mjs";
import { deleteTaskController, getTaskController, postTaskController, putTaskController } from "./controllers/tasksControllers.mjs";

app.use(express.json());
app.use(requestLog);

app.post(PATH_PREFIX+"/users/", postUserController);

app.get(PATH_PREFIX+"/tasks/", authMiddleware, getTaskController);
app.post(PATH_PREFIX+"/task/", authMiddleware, postTaskController);
app.put(PATH_PREFIX+"/task/", authMiddleware, putTaskController);
app.delete(PATH_PREFIX+"/task/", authMiddleware, deleteTaskController);

app.listen(PORT,()=>{
    console.log("Express running...");
});