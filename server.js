const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const { PeerServer } = require('peer');
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/peerjs', PeerServer)

// app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`)
// })

// app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room })
// })

app.get('/', (req, res) => {
  res.json({ 'msg': "All Done" })
})

app.get('/bus-1', (req, res) => {
  res.render('room', { roomId: "bus-1" })
})

io.on('connection', socket => {
  console.log('io  connection');
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId);
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)