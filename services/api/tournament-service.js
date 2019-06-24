const request = require("request");
const askTemplateButtons = require("../../routes/webhook/askTemplateButtons");
const callSendAPI = require("../../routes/webhook/callSendAPI");

module.exports = {
    getArrivingTournament: function () {
        return new Promise(function (resolve, reject) {
            request({
                uri: process.env.URL + "/api/tournaments/arriving",
                method: "GET"
            }, function (err, res, request_body) {
                if (!err) {
                    if (request_body) {
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
                console.log(body._id);
                var date = new Date(body.date.replace('.000', ''));
                var response = askTemplateButtons("Le prochain tournoi: " + body.name + " est le " + date.toString() + ". Voulez-vous participer ?",
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
                );
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
                        console.log(request_body);
                        resolve(JSON.parse(request_body));
                    } else {
                        resolve({});
                    }
                } else {
                    reject(err);
                }
            });
        });
    }
}
