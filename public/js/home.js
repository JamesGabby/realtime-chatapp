const socket = io()

const $dropdown = document.querySelector('#dropdown')
const activeRoomsTemplate = document.querySelector('#active-rooms-template').innerHTML

socket.on('activeRooms', ({ rooms }) => {
  const html = Mustache.render(activeRoomsTemplate, {
    rooms
  })
  document.querySelector('#dropdown').innerHTML = html
})