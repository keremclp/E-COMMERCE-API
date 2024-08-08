require('dotenv').config()
require('express-async-errors')


// express 

const express = require('express')
const app = express()

// database 
const connectDB = require('./db/connect')

// error handler
const notFoundMiddlewear = require('./middleware/not-found')
const errorHandlerMiddlewear = require('./middleware/error-handler')

// middlewear
app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use(notFoundMiddlewear)
app.use(errorHandlerMiddlewear)
const port = process.env.PORT || 5000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
        
        
    }
} 

start()