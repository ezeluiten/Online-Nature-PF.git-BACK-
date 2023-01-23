const dotenv = require("dotenv")
const mongoose = require('mongoose')
dotenv.config({path: "./config.env"})

const DB = process.env.DATABASE
<<<<<<< HEAD
//const DB_DEP = process.env.DB_DEPLOY
=======
// const DB_DEP = process.env.DB_DEPLOY
>>>>>>> 2c95311a320d9e1e3f660e39831a25a4f7810764

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