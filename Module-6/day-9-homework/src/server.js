const express = require("express")

const cors = require("cors")

const listEndpoints = require("express-list-endpoints")

const port = process.env.PORT

const studentRouter = require("./students")//
const projectRouter = require("./projects")

const {
    notFoundHandler,
    badRequestHandler,
    genericErrorHandler,
} = require("./students/errorHandler")
const { resolveSoa } = require("dns")
const server = express()

server.get("/", (req, res) => { res.send("the server is running") })

server.use(express.json())
server.use('/students', studentRouter)
server.use("/projects", projectRouter)

// ERROR HANDLERS MIDDLEWARES

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

// mongoose
//     .connect("mongodb://localhost:27017/Hw2", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(
//         server.listen(port || 5000, () => {
//             console.log("Running on port", port)
//         })
//     )
//     .catch((err) => console.log(err))

server.listen(port, () =>
    console.log(`Runing on: ${port}`))
