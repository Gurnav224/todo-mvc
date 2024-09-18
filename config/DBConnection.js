const mongoose = require('mongoose')


async function intializeDatabase(){
    try {
        const conn = mongoose.connect(process.env.MONGODB);
        if(conn){
            console.log(`successfully connected to database`)
        }
    } catch (error) {
        console.error('failed to connect to database');
        process.exit(1)
    }
}


module.exports = {intializeDatabase}