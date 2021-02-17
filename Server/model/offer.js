const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserOffer = new Schema({
    offerID: {
        type: String,
        required: true
    },
    farmerID: {
        type: String,
        required: true
    },
    fruitName: {
        type: String,
        required: true
    },
    fruitQuantity: {
        type: Number,
        required: true
    },
    fruitUnitPriceEUR: {
        type: Number,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    isSell: {
        type: Boolean
    },
    idBuyer: {
        type: String
    }
});

mongoose.model('offer', UserOffer);