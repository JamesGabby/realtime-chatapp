const rooms = []

const addRoom = ({ roomName }) => {
  const existingRoom = rooms.find((currentRoom) => {
    return currentRoom === roomName
  })

  if (existingRoom) {
    return {
      error: 'Room exists!'
    }
  }

  const room = { roomName }

  rooms.push(room)

  return { room }
}

const getRooms = () => {
  return rooms
}

module.exports = {
  addRoom,
  getRooms
}