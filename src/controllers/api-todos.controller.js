const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model.');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/', asyncHandler(createToDo));
    router.get('/', asyncHandler(getToDos));
    router.get('/:id', asyncHandler(getToDoById));
    router.delete('/:id', asyncHandler(deleteToDoById));
    router.delete('/', asyncHandler(deleteToDos));
    router.patch('/:id', asyncHandler(updateToDoById));
}

async function createToDo(req, res) {
    const {id, title, userId, description, isDone, isFavourite, priority} = req.body
    console.log(id)
    const todo = await ToDo.create({id, title, userId, description, isDone, isFavourite, priority})
    console.log(todo)
    res.status(200).json(todo);
}

async function getToDos(req, res) {
    const todos = await ToDo.findAll();

    res.status(200).json({ todos });
}

async function getToDoById(req, res) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(todo);
}

async function updateToDoById(req, res) {
    const {title, userId, description, isDone, isFavourite, priority} = req.body
    const todo = await ToDo.update({
        title, userId, description, isDone, isFavourite, priority
    }, {
        where: {
            id: req.params.id
        }
    })
    if (!todo) {
        throw new ErrorResponse('Todo not found', 404);
    }
    res.status(200).json(todo);
}

async function deleteToDoById(req, res, next) {
    const todo = await ToDo.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(todo);
}

async function deleteToDos(req, res, next) {
    const todo = await ToDo.destroy({
        truncate: true
    })
    res.status(200).json(todo);
}

initRoutes();

module.exports = router;