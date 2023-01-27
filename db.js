const dotenv = require("dotenv")
const mongoose = require('mongoose')
dotenv.config({path: "./config.env"})

const DB = process.env.DATABASE
// const DB_DEP = process.env.DB_DEPLOY

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            DB,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Conección correcta!!')
                }
            }
        )
    }
    connect();
}