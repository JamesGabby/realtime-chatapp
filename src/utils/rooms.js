const rooms = []

const addRoom = ({ room }) => {
  rooms.push({ room })
}

const getRooms = () => {
  return rooms
}

module.exports = {
  addRoom,
  getRooms
}