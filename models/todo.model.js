const mongoose = require('mongoose');
const {Schema} = mongoose;


const TodoSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        required:true
    }
});


const Todo = mongoose.model('Todo',TodoSchema);


module.exports = Todo;