const express = require("express");
const { intializeDatabase } = require("./config/DBConnection");
const morgan = require('morgan')
const todoRouter = require('./routes/Todo.routes')
const os = require('os');

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

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (let name in interfaces) {
      for (let interface of interfaces[name]) {
        if (interface.family === 'IPv4' && !interface.internal) {
          return interface.address;
        }
      }
    }
    return '127.0.0.1'; // Default to localhost if no IP found
  }
  
  const localIpAddress = getLocalIpAddress();
  console.log(`Server is running on IP address: ${localIpAddress}`);

app.listen(PORT,() => {
    console.log(`server running in ${process.env.NODE_ENV} MODE ${PORT}`)
})