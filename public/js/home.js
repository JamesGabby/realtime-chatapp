const socket = io()

const activeRoomsTemplate = document.querySelector('#active-rooms-template').innerHTML

socket.on('activeRooms', ({ rooms }) => {
  const html = Mustache.render(activeRoomsTemplate, {
    rooms
  })

  document.querySelector('#active-rooms').innerHTML = html
})