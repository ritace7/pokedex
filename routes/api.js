const express = require('express');
const Pokemon = require('../models/pokemon');
const router = express.Router();

//get a list of pokemon from db by region
router.get('/pokemon', (req, res, err) => {
    const name  = req.query.name;

    if(name){
        //format correctly
        let formattedName="";
        formattedName = name[0].toUpperCase();
        for(let i=1; i<name.length;i++){
            formattedName += name[i].toLowerCase();
        }
        Pokemon.find({name: formattedName})
        .then((pokemon) => {
                res.send(pokemon);
        })        
    }else{
        Pokemon.find({region: req.query.region})
        .then((pokemon) => {
            res.send(pokemon);
        });
    }
})

//add a new pokemon to db
router.post('/pokemon', (req, res, next) => {
    Pokemon.create(req.body).then((pokemon)=>{
        res.send(pokemon);
    }).catch(next); 
})

//update a pokemon in the db
router.put('/pokemon/:id', (req, res, next) => {
    Pokemon.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(()=>{
            Pokemon.findOne({_id: req.params.id})
                .then((pokemon) => {
                    res.send(pokemon);
                })
        })
})

//delete a pokemon from the db
router.delete('/pokemon/:id', (req, res, next) => {
    Pokemon.findByIdAndDelete({_id: req.params.id})
        .then((pokemon) => {
            res.send(pokemon);
        })
})

module.exports = router;