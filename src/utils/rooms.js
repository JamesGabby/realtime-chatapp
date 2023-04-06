const { getUsersInRoom } = require('./users')

const rooms = []

const addRoom = ({ room }) => {
  const foundRoom = rooms.find(r => r.room === room)

  if (!foundRoom) {
    rooms.push({ room }) 
  }
}

const removeRoomIfNoUsers = (room) => {
  const users = getUsersInRoom(room)

  if (users.length === '') {
    const index = rooms.findIndex(r => r.room === room)

    if (index !== -1) {
      return rooms.splice(index, 1)
    }
  }
}

const getRooms = () => {
  return rooms
}

module.exports = {
  addRoom,
  getRooms,
  removeRoomIfNoUsers
}