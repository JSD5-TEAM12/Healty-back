const express = require('express')
const { readdirSync } = require('fs');
const dotenv = require("dotenv");

// import middleware
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser')

// Connect database
const connectServer = require('./config/db')
dotenv.config()
const app = express()

const port = process.env.PORT || 8050;

// use middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(morgan('dev'));
//app.use(cors(corsOptions));
app.use(
    cors({
      exposedHeaders: ['authorization'], // Specify the headers that you want to expose
    })
  );



// Route
readdirSync('./routes').map((r)=>app.use('/',require('./routes/'+r)))


const startSever = async ()=>{
    await connectServer.connectDB();
    app.listen(port,()=>{
        console.log(`Server is running`)
        console.log(`http://localhost:8050/`)
    })
}

startSever();
