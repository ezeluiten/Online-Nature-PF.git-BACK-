const app = require("./app")
const db = require('./db.js')
// const cors = require('cors')
// const express = require("express")

// const corsOpt = {
//     origin: "*",
//     method: "GET,PUT,POST,DELETE"
// }

// app.use(express.json())
// app.use(cors())

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`App running on port ${port}...`)
})

db();
