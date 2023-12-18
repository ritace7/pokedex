const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create pokemon Schema & model
const PokemonSchema = new Schema({
    nationalIndex: {
        type: Number,
        required: [true, 'National index is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    description: {
        type: String,
        required: [true, 'Name field is required']
    },
    type: {
        type: String,
        required: [true, 'Pokemon type is required']
    },
    moves: {
        type: [String],
        default: ["Tackle"]
    },
    region: {
        type: String
    }
})

const Pokemon = mongoose.model('pokemon', PokemonSchema);

module.exports = Pokemon;