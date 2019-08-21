const request = require("request");
const askTemplateButtons = require("../../routes/webhook/askTemplateButtons");
const callSendAPI = require("../../routes/webhook/callSendAPI");
const userService = require("./user-service");

module.exports = {
    getArrivingTournament: function () {
        return new Promise(function (resolve, reject) {
            request({
                uri: process.env.URL + "/api/tournaments/arriving",
                method: "GET"
            }, function (err, res, request_body) {
                if (!err) {
                    if (request_body && res.statusCode === 200) {
                        resolve(JSON.parse(request_body));
                    } else {
                        resolve({});
                    }
                } else {
                    reject(err);
                }
            });
        });
    },
    sendArrivingTournamentsToUser: function (sender_psid) {
        this.getArrivingTournament().then(function (body) {
            if (Object.keys(body).length !== 0) {
                var date = new Date(body.startDate.replace('.000', ''));
                /*var response = askTemplateButtons("Le prochain tournoi: " + body.name + " est le " + date.toString() + ". Voulez-vous participer ?",
                    {
                        payload: "REGISTER_TOURNAMENT/" + body._id,
                        title: "Oui !",
                        type: "postback",
                    },
                    {
                        payload: "DONT_REGISTER_TOURNAMENT",
                        title: "Non !",
                        type: "postback"
                    }
                );*/
                var response = {};
                response.quick_replies = {
                    text: "Le prochain tournoi: " + body.name + " est le " + date.toString() + ". Voulez-vous participer ?",
                    quick_replies:[
                        {
                            content_type: "text",
                            title: "Oui !",
                            payload: "REGISTER_TOURNAMENT/" + body._id
                        },{
                            content_type: "text",
                            title: "Non",
                            payload: "DONT_REGISTER_TOURNAMENT"
                        }
                     ]
                };
                callSendAPI(sender_psid, response);
            } else {
                callSendAPI(sender_psid, "Aucun tournoi de prévu pour le moment. :/");
            }
        })
    },
    getTournamentById: function(id){
        return new Promise(function(resolve, reject){
            request({
                uri: process.env.URL + "/api/tournaments/" + id,
                method: "GET"
            }, function (err, res, request_body) {
                if (!err) {
                    if (request_body){
                        resolve(JSON.parse(request_body));
                    } else {
                        resolve();
                    }
                } else {
                    reject(err);
                }
            });
        });
    },
    registerUserToTournament: function(tournamentId, sender_psid){
        this.getTournamentById(tournamentId).then(function(tournament){
            if(tournament){
                console.log(tournament);
                if(tournament.isSolo){
                    return new Promise(function(resolve, reject){
                        userService.getUserBySenderPsid(sender_psid).then(function (user) {
                            request({
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                uri: process.env.URL + "/api/tournaments/attendee/" + tournamentId,
                                method: "PUT",
                                json: {
                                    attendee: user._id
                                }
                            }, function (err, res, request_body) {
                                if (!err) {
                                    resolve({ soloTournament: tournament.isSolo, status: res.statusCode });
                                } else {
                                    reject(err);
                                }
                            });
                        }).catch(function(error){
                            console.log("error on update tournament", error);
                        });
                    });
                }
                else{
                    return new Promise(function(resolve, reject){
                        var response = {};
                        response.quick_replies = {
                            text: "Voulez-vous vous inscrire avec votre team si vous en avez une ?",
                            quick_replies:[
                                {
                                    content_type: "text",
                                    title: "Oui !",
                                    payload: "REGISTER_WITH_TEAM/" + tournamentId
                                },{
                                    content_type: "text",
                                    title: "Non",
                                    payload: "DONT_REGISTER_WITH_TEAM"
                                }
                            ]
                        };
                        callSendAPI(sender_psid, response).then(function(status){
                            resolve({ soloTournament: tournament.isSolo, status: status });
                        }).catch(function(){
                            reject();
                        });
                    });
                }
            }
        }).catch(function(error){
            console.log("error in getting tournament by ID");
        });
    },
    getTournaments(offset = 0, limit = 10){
        return new Promise(function(resolve, reject){
            request({
                headers: {
                    "Content-Type": "application/json"
                },
                uri: process.env.URL + "/api/tournaments?offset=" + offset + "&limit=" + limit,
                method: "GET"
            }, function (err, res, request_body) {
                if (!err) {
                    resolve(request_body);
                } else {
                    reject(err);
                }
            });
        });
    },
    registerTeamToTournament: function(tournamentId, teamId){
        return new Promise(function(resolve, reject){
            request({
                headers: {
                    "Content-Type": "application/json"
                },
                uri: process.env.URL + "/api/tournaments/attendee/" + tournamentId,
                method: "PUT",
                json: {
                    attendee: teamId
                }
            }, function (err, res, request_body) {
                if (!err) {
                    resolve(res.statusCode);
                } else {
                    reject(err);
                }
            });
        });
    }
};
