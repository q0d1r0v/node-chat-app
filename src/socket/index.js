// Socket
const Socket = (socket) =>  {
    console.log("Socket user is connected!")

    socket.on('some-route', (data) => {
        console.log(data)
    })

    socket.on("disconnect", () => {
        console.log("Socket user is disconnected!")
    })
}

module.exports = Socket