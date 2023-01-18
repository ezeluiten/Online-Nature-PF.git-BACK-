// const morgan = require("morgan")
const app = require("./app")
const db = require('./db.js')

const port = process.env.PORT || 5000

// app.use(morgan('dev'));

app.listen(port, ()=>{
    console.log(`App running on port ${port}...`)
})

db()
