const generateMessage = (text, username) => {
  return {
    text,
    username,
    createdAt: new Date().getTime()
  }
}

const generateLocationURL = (url, username) => {
  return {
    url,
    username,
    createdAt: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocationURL
}