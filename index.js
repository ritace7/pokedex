require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/api');

//set up express app
const app = express();

//middleware
app.use(express.json());
app.use(express.static('dist'))

//initialize routes
app.use('/api', routes);

//error handling middleware
app.use((err, req, res, next)=>{
    res.status(422).send({error: err.message})
})

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.port, ()=>{
            console.log(`connected to db and server running on port: ${process.env.port}`);
        })
    })    
    .catch((error) => {
        console.log(error)
    });