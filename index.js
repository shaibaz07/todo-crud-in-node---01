const cl = console.log;

const todosArr = [
    {
        todoItem: "HTML",
        id: '123'
    },
    {
        todoItem: "CSS",
        id: '124'
    },
    {
        todoItem: "JavaScript",
        id: '125'
    }
];



const express = require("express");

const app = express()

const PORT = 3000;

app.use(express.json())

//get all

app.get('/api/todo', (req, res) => {

    try {
        res.status(200).json({
            ok: true,
            message: "todo fetch successfully!!! ",
            data: todosArr

        })
    } catch (err) {

        res.status(500).json({
            ok: false,
            message: "Something went wrong while fetching todos",
            err: err.message
        })


    }





})

// single get

app.get('/api/todo/:id', (req, res) => {
    try {
        let todoId = req.params.id;
        let todoObj = todosArr.find(t => t.id === todoId)
        if (!todoObj) {
            return res.status(404).json({
                ok: false,
                message: `Todo with ID '${todoId}' not found`
            })
        }

        res.status(200).json({
            ok: true,
            message: "data fetched successfully !!!",
            data: todoObj
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Something went wrong while fetching the todo',
            err: err.message
        })
    }
})

// create

app.post('/api/todo', (req, res) => {
    try {
        let newObj = {
            todoItem: req.body.todoItem,
            id: Date.now().toString()

        }

        todosArr.push(newObj)

        res.status(201).json({
            ok: true,
            message: "todo created successfully!!!",
            data: newObj
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Something went wrong while creating the todo',
            err: err.message
        })

    }
})


app.patch('/api/todo/:id', (req, res) => {

    try {
        let updateId = req.params.id;

        let updateIdx = todosArr.findIndex(t => t.id === updateId)


        let updatedObj = {
            // ...todosArr[updateIdx],
            todoItem: req.body.todoItem,
            id: req.params.id

        }

        if (updateIdx === -1) {
            return res.status(404).json({
                ok: false,
                message: `Todo with ID ${updateId} not found for update.`
            })
        }
        todosArr[updateIdx] = updatedObj

        res.status(200).json({
            ok: true,
            message: `todo with id ${updateId} is updeted successfully`,
            data: updatedObj
        })


    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Something went wrong while updating todo with ID '${updateId}`,
            err : message.err
        })
    }
})


app.delete('/api/todo/:id', (req, res) => {
    let removeId = req.params.id;
    try {

        let removeIdx = todosArr.findIndex(t => t.id === removeId)
        if (removeIdx === -1) {
            return res.status(404).json({
                ok: false,
                message: `Todo with ID '${removeId}' not found for deletion.`
            })
        }

        todosArr.splice(removeIdx , 1)

        res.status(200).json({
            ok : true,
            message: `todo with id: ${removeId} is removed successfully`
            
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Something went wrong while deleting todo with ID '${removeId}`,
            err : message,err
        })
    }
})



app.listen(3000, () =>
    cl(`server is running on port`)
)