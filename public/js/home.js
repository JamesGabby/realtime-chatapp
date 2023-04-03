const socket = io()

const $dropdown = document.querySelector('#dropdown')
const activeRoomsTemplate = document.querySelector('#active-rooms-template').innerHTML

socket.on('activeRooms', ({ rooms, roomCount }) => {
  console.log(rooms)
  const html = Mustache.render(activeRoomsTemplate, {
    rooms,
    roomCount
  })
  document.querySelector('#dropdown').innerHTML = html
})