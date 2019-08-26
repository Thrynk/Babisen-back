const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const Team = mongoose.model('Team', {
    name: String,
    athletes: [ObjectId],
    awards: [ObjectId],
    logo: String,
    imgUrl: String,
    founder: ObjectId,
    foundingDate: Date,
    parentOrganization: ObjectId,
    slogan: String,
    description: String,
    coach: ObjectId
});

module.exports = Team;
