const request = require('request');

const accessToken = process.env.FB_ACCESS_TOKEN;

// Sends response messages via the Send API
module.exports = function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body;
    if (response.attachment) {
        request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };

    } else if(response.quick_replies) {
        request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response.quick_replies
        };
    }
    else if(response.sender_action){
        request_body = {
            "recipient": {
                "id": sender_psid
            },
            "sender_action": response.sender_action
        };
    }
    else {
        request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": {
                "text": response
            }
        };
    }



    return new Promise(function(resolve, reject){
        // Send the HTTP request to the Messenger Platform
        request({
            uri: "https://graph.facebook.com/v2.6/me/messages",
            qs: {"access_token": accessToken},
            method: "POST",
            json: request_body
        }, (err, res, body) => {
            if (!err) {
                if (res.statusCode === 200) {
                    //Message envoyé
                    console.log("Message sent : " + request_body + " to " + sender_psid);
                    resolve(res.statusCode);
                }
                else{
                    console.log("Message has not been sent");
                    console.log(JSON.stringify(request_body, null, 4));
                    reject(res.statusCode)
                }
            } else {
                reject(err);
            }
        });
    });
};
