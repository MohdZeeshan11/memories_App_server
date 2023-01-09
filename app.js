const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const start = require('./db/connect');
require('dotenv').config();
const posts = require('./routes/posts');


app.use(morgan('tiny'));
// app.use(express.json());
// app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


// routes
app.use('/post',posts);

const port = process.env.port || 5000;

// database connection
start(process.env.DATABASE_URL);

app.listen(port,()=>{
    console.log(`server is running at port ${port}...`);
})