import { tasks } from "../models/tasksModels.mjs"
import { db } from "../models/db.mjs"

//Controlador para devolver todas las tareas
export function getAllTasksController (request, response) {
    db.all(
        `SELECT id, description, done FROM tasks`,
        (err,data)=>{
            if ( err ) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.json(data)
            }
        }
    )
}

export function getOneTaskController (request, response) {
    try {
        const task = tasks.find(
            item => item.id === parseInt(request.params.id)
        )
        if ( task ) response.json(task)
        else response.sendStatus(404);
    } catch (err) {
        response.sendStatus(400)
    }
}


//Controlador para insertar una tarea
export function postTaskController (request, response) {
    const { description, done } = request.body;
    db.run(
        `INSERT INTO tasks(description, done) VALUES ("${description}", ${done})`,
        (err)=>{
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.sendStatus(201)
            }
        }
    )
}

//Controlador para modificar una tarea
export function putTaskController (request, response) {
    const { id, description, done } = request.body;
    db.run(
        `UPDATE tasks SET description="${description}",
        done= ${done} WHERE id="${id} "`,
        (err)=>{
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.sendStatus(201)
            }
        }
    )
}

export function deleteTaskController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks.splice(oldTaskIdx,1);
    response.sendStatus(200)
}