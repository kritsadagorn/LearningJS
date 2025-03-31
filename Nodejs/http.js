const http = require('http')

const port = 3000;
const server = http.createServer((req,res) => {
    res.end('Hello HH')
})

server.listen(port, () => {
    console.group(`Server is running on port ${port}`)
})