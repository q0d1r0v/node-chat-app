// Socket
const Socket = (socket) =>  {
    console.log("Socket user is connected!")

    socket.on('send-message', (data) => {
        console.log(data)
    })

    socket.on("disconnect", () => {
        console.log("Socket user is disconnected!")
    })
}

module.exports = Socket