const app = require("./app");
const db = require("./db.js");

// dotenv.config({path: "./config.env"})

// const DB = process.env.DATABASE

// mongoose.connect(DB, {
//     useNewUrlParser:true
// }).then(con=>console.log(con.connections, "db success"))

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

db();
