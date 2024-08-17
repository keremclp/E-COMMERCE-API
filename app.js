require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')


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
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')
// database 
const connectDB = require('./db/connect')

// error handler
const notFoundMiddlewear = require('./middleware/not-found')
const errorHandlerMiddlewear = require('./middleware/error-handler')

// extra packages
app.set('trust proxy',1)
app.use(rateLimit( {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60 // limit each IP to 100 requests per windowMs
}))
app.use(helmet());
app.use(cors());
app.use(xss())
app.use(mongoSanitize())

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
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

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