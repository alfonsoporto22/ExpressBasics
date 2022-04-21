import express from "express";
const app = express();
const PORT = 3000;

const tasks = [
    {
        id: 0,
        description: "Mercar pan",
        done: false
    },
    {
        id: 3,
        description: "Mercar leite",
        done: false
    }
]

app.use(express.json())

app.get("/api/v0.0/tasks/",(request, response)=>{
    response.json(tasks)
})

app.post("/api/v0.0/task/",(request, response)=>{
    tasks.push(request.body);
    response.sendStatus(201);
})

app.put("/api/v0.0/task/",(request, response)=>{
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks[oldTaskIdx] = updatedTask;
    response.sendStatus(200);
})

app.delete("/api/v0.0/task/",(request, response)=>{
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks.splice(oldTaskIdx,1);
    response.sendStatus(200)
})

app.listen(PORT,()=>{
    console.log("Express running...");
})