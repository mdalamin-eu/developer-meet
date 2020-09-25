const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const morgan=require('morgan')
require('dotenv').config()

app.use(morgan());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true }).then(() => console.log('DB connected'))
.catch((err) => console.log(err))

// API
app.get("/",(req, res) => res.send("API running"))

app.use("/api/users", require("./routes/user"));
app.use("/api/posts",require('./routes/posts')) ;
app.use("/api/schools", require("./routes/schools"))

const PORT = process.env.PORT || 5000
app.listen(PORT,() =>(console.log(`App listening on ${PORT}`)))