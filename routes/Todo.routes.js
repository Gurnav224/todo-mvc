
const express = require('express');
const { createTodo, getAllTodos , unmark , mark , deleteItem} = require('../controllers/Todo.controller')

const router = express.Router();


router.post('/createTodo', createTodo);
router.get('/',getAllTodos)
router.put('/unmark', unmark);
router.put('/mark', mark);
router.delete('/todo', deleteItem)


module.exports = router;