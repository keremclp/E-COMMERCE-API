require('dotenv').config()
require('express-async-errors')

// express 
const express = require('express')
const app = express()

// rest of packages
const morgan = require('morgan') 
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
// routers
const authRouter = require("./routes/authRoutes")
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
// database 
const connectDB = require('./db/connect')

// error handler
const notFoundMiddlewear = require('./middleware/not-found')
const errorHandlerMiddlewear = require('./middleware/error-handler')

// middlewear
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())
// routes
app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.get('/api/v1',(req,res)=>{
    // console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('e-commerce-api')
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

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