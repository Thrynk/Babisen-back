const callSendAPI = require("../callSendAPI");
const teamService = require("../../../services/api/team-service");
const userService = require("../../../services/api/user-service");
const carousel = require("../carousel");

module.exports = function(sender_psid){
    userService.getUserBySenderPsid(sender_psid).then(function(user){
        if (user.affiliationTeams) {
            return teamService.getUserTeams(user._id).then(function(teams){
                return { hasTeams: true, teams: teams};
            });
        }
        else {
            return Promise.resolve({ hasTeams: false });
        }
    }).then(function(response){
        if(response.hasTeams){
            let responseToSend;
            let elements = [];
            response.teams.forEach(function(team){
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
                        "title":"En savoir plus",
                        "payload":"TEAMS_INFOS/" + team._id
                    }
                ];
                elements.push(element);
            });
            responseToSend = carousel(elements);
            callSendAPI(sender_psid, responseToSend).then(function(status){
                console.log(status);
            }).catch(function(err){
                console.log(err);
            });
        }
        else {
            callSendAPI(sender_psid, "Vous n'avez pas d'équipes");
        }
    }).catch(function(err){
        console.log("Error during creation or delivery of my teams payload")
    });
};
