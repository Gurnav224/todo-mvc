const express = require("express");
const { intializeDatabase } = require("./config/DBConnection");
const morgan = require('morgan')
const todoRouter = require('./routes/Todo.routes')

intializeDatabase()


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(todoRouter);

console.log('IP',process.env.IP)

//setting view engine to ejs
app.set('view engine','ejs')

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}


// app.get('/' , (req , res) => {
//     res.render('index')
// })

const PORT  = process.env.PORT



app.listen(PORT,() => {
    console.log(`server running in ${process.env.NODE_ENV} MODE ${PORT}`)
})