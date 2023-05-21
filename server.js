
const express = require('express')
const app = express()
const server = require('http').Server(app)
// const io = require('socket.io')(server)
// access environment variables
require("dotenv").config();

// connect to database
require("./config/database");
//routes 
const userRouter = require('./routes/user_route');
const busRouter = require('./routes/bus_route');
// const { loginValidator } = require('./utils/validators/authValidator');
// const { login } = require('./controllers/auth_controller');
const authRouter = require('./routes/auth_route');
var cors = require('cors')
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 'msg': "All Done" })
})

app.use('/api/users', userRouter)
app.use("/api/auth", authRouter);
app.use("/api/buses", busRouter);


// io.on('connection', socket => {
//   console.log('io  connection');
//   socket.on('join-room', (roomId, userId) => {
//     console.log(roomId, userId);
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user-connected', userId)

//     socket.on('disconnect', () => {
//       socket.to(roomId).broadcast.emit('user-disconnected', userId)
//     })
//   })
// })

server.listen(process.env.PORT || 8000)