const tournamentService = require("../../../services/api/tournament-service");
const userService = require("../../../services/api/user-service");
const callSendAPI = require("../callSendAPI");
const carousel = require("../carousel");
const teamService = require("../../../services/api/team-service");

module.exports = function(sender_psid, tournamentId){
    userService.getUserBySenderPsid(sender_psid).then(function(user){
        console.log(user, user.affiliationTeams);
        if(user.affiliationTeams){
            teamService.getUserTeams(user._id).then(function(teams){
                console.log(teams);
                let response;
                let elements = [];
                teams.forEach(function(team){
                    let element = {
                        title: team.name,
                    };
                    if(team.imgUrl){
                        element.image_url = team.imgUrl;
                    }
                    if(team.description){
                        element.subtitle = team.description;
                    }
                    element.buttons = [
                        {
                            "type":"postback",
                            "title":"Choisir cette équipe",
                            "payload":"REGISTER_WITH_THIS_TEAM/5d3f70f7decdb33790c47e02/5d4b5d8e59400304f4ce84c1"
                        }
                    ];
                    elements.push(element);
                });
                response = carousel(elements);
                callSendAPI(sender_psid, response).then(function(status){
                    console.log(status);
                }).catch(function(err){
                    console.log(err);
                });
            }).catch(function(err){
                console.log("error while trying to get teams of user");
            })
        }
        else {
            var response = "Vous n'avez pas d'équipe.";
            callSendAPI(sender_psid, response);
        }
    }).catch(function(error){
        console.log("error when trying to get user by psid");
    });
};
