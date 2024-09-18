const Todo = require("../models/todo.model")


module.exports = {

    createTodo:async function(req, res){
        const todo = {
            title:req.body.title,
            completed:false
        }
        try {
            const newTodo = new Todo(todo);
            const savedTodo = await newTodo.save();
            console.log('todo Created successfully',savedTodo)
            res.redirect('/')

        } catch (error) {
            console.error(error);
            res.json({error:'server error'});
        }
    },

    getAllTodos:async function(req, res){
        try {
            const allTodos = await Todo.find({});
            const left = await Todo.countDocuments({completed:false})
            res.render('index',{todos:allTodos, left:left})
        } catch (error) {
            console.error('error to get all todos');
            res.status(500).json({error:'server error'})
        }
    },

    unmark: async function(req , res) {
        console.log('title',req.body.title)
        try {
            const todo = await Todo.findOneAndUpdate(
                {title:req.body.title},
                {
                    $set:{
                        completed:false
                    }
                },
                {
                    sort:{_id:-1},
                    upsert:false
                }
            )

            res.status(200).json({message:'todo updated successfully',todo})
        } catch (error) {
            console.log('error to update todo',error);
            res.status(500).json({error:'server error'})
        }
    },
    mark: async function(req , res) {
        console.log('title',req.body.title)
        try {
            const todo = await Todo.findOneAndUpdate(
                {title:req.body.title},
                {
                    $set:{
                        completed:true
                    }
                },
                {
                    sort:{_id:-1},
                    upsert:false
                }
            )

            res.status(200).json({message:'todo updated successfully',todo})
        } catch (error) {
            console.log('error to update todo',error);
            res.status(500).json({error:'server error'})
        }
    },
    deleteItem:async function (req , res){
        console.log("delete todo", req.body.title)
        try {
            const todo = await Todo.findOneAndDelete({title:req.body.title});
            console.log('deleted todo',todo)
            res.json(todo)
        } catch (error) {
            console.error('error todo delete',error);
        }
    }
}