import { tasks } from "../models/tasksModels.mjs"
import { db } from "../models/db.mjs"

//Controlador para devolver todas las tareas
export function getAllTasksController(request, response) {
    db.all(
        `SELECT id, description, done FROM tasks`,
        (err, data) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.json(data)
            }
        }
    )
}

//Controlador para devolver una tarea
export function getOneTaskController(request, response) {
    const task =  parseInt(request.params.id)
    db.all(
        `SELECT id, description, done FROM tasks WHERE id="${task}"`,
        (err, data) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.json(data)
            }
        }
    )
}


//Controlador para insertar una tarea
export function postTaskController(request, response) {
    const { id, description, done } = request.body;
    db.run(
        `INSERT INTO tasks(id, description, done) VALUES 
            ("${id}","${description}", ${done})`,
        (err) => {
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
export function putTaskController(request, response) {
    const { id, description, done } = request.body;
    db.run(
        `UPDATE tasks SET description="${description}",
        done= ${done} WHERE id="${id} "`,
        (err) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.sendStatus(201)
            }
        }
    )
}
//Controlador para eliminar una tarea
export function deleteTaskController(request, response) {
    const { id } = request.body;
    db.run(
        `DELETE FROM tasks WHERE id="${id}"`,
        (err) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.sendStatus(200)
            }
        }
    )
}