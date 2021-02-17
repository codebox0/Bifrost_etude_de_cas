exports.findMongodbUser = async function findMongodbUser(mongoose) {
    require('../model/user');
    console.log('test find');
    // const User = mongoose.model('user', use);
    const User = mongoose.model('user');
    let data = User.find({});
    console.log('data finish : ', data);
    return data;
}

exports.findMongodbUserBy = async function findMongodbUser(mongoose, user) {
    require('../model/user');
    console.log('test find');
    // const User = mongoose.model('user', use);
    const User = mongoose.model('user');
    let data = User.find(user);
    return data;
}


exports.findMongodbOffer = async function findMongodbOffer(mongoose) {
    require('../model/offer');
    console.log('test find');
    // const User = mongoose.model('user', use);
    const Offer = mongoose.model('offer');
    let data = Offer.find({});
    console.log('data finish : ', data);
    return data;
}

exports.findMongodbOfferBy = async function findMongodbUser(mongoose, offer) {
    require('../model/offer');
    console.log('test find');
    // const User = mongoose.model('user', use);
    const Offer = mongoose.model('offer');
    let data = Offer.find(offer);
    return data;
}


exports.findAndUpdateMongodbOfferBy = async function findAndUpdateMongodbOfferBy(mongoose, offer) {
    require('../model/offer');
    console.log('test find');
    // const User = mongoose.model('user', use);
    const Offer = mongoose.model('offer');
    let data = Offer.find({offerID: offer.offerID}, offer);
    return data;
}



exports.initializeBdData = function initializeBdData(mongoose) {
    this.findMongodbUser(mongoose);
}