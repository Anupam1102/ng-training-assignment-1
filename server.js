// to do list application

const express=require(express)
const utils = require('./utils')
const cors = require('cors')

const app = express()

// enable the CORS so that other applications can call the APIs
app.use(cors())

app.use(express.json())


app.use((request, response, next) => {
  if ( request.url == '/user/register' ||   request.url == '/user/login') {
    next()
    } else {
        try {
            // add the payload in the request
            // since the same request will be forwarded to the
            // next function, every function/route in the application
            // can access the payload using request.user key
            request.user = payload

            // call the next function
            next()
        } catch (ex) {
            response.send(utils.createError('invalid User'))
        }
    }
})


// add the routes
const userRouter = require('./routes/user');
//const todoRouter = require('./routes/todo');

app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})