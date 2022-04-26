import express from "express";
import { config } from "dotenv";

if ( ! process.env.NODE_ENV === "production" ) config()

const app = express();

import { authMiddleware } from "./middleware/authorization.mjs";
import { requestLog } from "./middleware/requestsLog.mjs";

import { postUserController } from "./controllers/usersControllers.mjs";
import { deleteTaskController, getTaskController, postTaskController, putTaskController } from "./controllers/tasksControllers.mjs";

const jsonParser = express.json();
app.use(requestLog);

app.post(process.env.PATH_PREFIX+"/users/", jsonParser, postUserController);

app.get(process.env.PATH_PREFIX+"/tasks/", authMiddleware, getTaskController);
app.post(process.env.PATH_PREFIX+"/task/", authMiddleware, jsonParser, postTaskController);
app.put(process.env.PATH_PREFIX+"/task/", authMiddleware, jsonParser, putTaskController);
app.delete(process.env.PATH_PREFIX+"/task/", authMiddleware, jsonParser, deleteTaskController);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Express running...");
});