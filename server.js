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
//const corsOptions = {
    // origin: 'http://localhost:5173', // Replace with your specific origin
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
    // exposedHeaders: ['authorization'],
  //};

// use middleware
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({limit : '10mb'}));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
//app.use(cors(corsOptions));
app.use(
    cors({
      exposedHeaders: ['authorization'], // Specify the headers that you want to expose
    })
  );
// app.use(bodyParser.json({limit : '10mb'}));



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
