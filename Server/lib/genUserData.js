exports.addUser = function adduser(mongoose, user) {
    require('../model/user');
    // const skill = require('../Models/data/skill');
    const User = mongoose.model('user');
        new User(user)
            .save()
            .then(user => {
                console.log('User : ', user);
            });
}


exports.addOffer = function adduser(mongoose, offer) {
    require('../model/offer');
    // const skill = require('../Models/data/skill');
    const Offer = mongoose.model('offer');
        new Offer(offer)
            .save()
            .then(user => {
                console.log('Offer : ', offer);
            });
}
