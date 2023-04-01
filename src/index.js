const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationURL } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

const admin = 'Admin'

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage('Welcome!', admin))
    socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`, admin))
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed')
    }
 
    io.to(user.room).emit('message', generateMessage(message, user.username))
    callback()
  })

  socket.on('sendLocation', (location, callback) => {
    const user = getUser(socket.id)
    const url = `https://google.co.uk/maps?q=${location.lat},${location.long}`

    io.to(user.room).emit('locationMessage', generateLocationURL(url, user.username))
    callback()
  }) 

  socket.on('disconnect', () => {
    const user = getUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', generateMessage(`${user.username} has left`, admin))
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }

    removeUser(socket.id)
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}!`)
})