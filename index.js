"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

restService.post("/attendance", function(req, res) {
    var userId;
    var password;
    var speech =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.userId &&
        req.body.queryResult.parameters.password ?
        (userId = req.body.queryResult.parameters.userId) &&
        (password = req.body.queryResult.parameters.password) &&
        (speech = userId + password) :
        "Seems like some problem. Speak again.";
    return res.json({
        payload: {
            google: {
                expectUserResponse: false,
                richResponse: {
                    items: [{
                        simpleResponse: {
                            textToSpeech: "Alright, your silly name is red 25! I hope you like it. See you next time."
                        }
                    }]
                },
                userStorage: "{\"data\":{}}"
            }
        }
    });


});


restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});