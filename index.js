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
        "conversationToken": "[]",
        "expectUserResponse": true,
        "expectedInputs": [{
            "inputPrompt": {
                "richInitialPrompt": {
                    "items": [{
                        "simpleResponse": {
                            "textToSpeech": "this is attendance"
                        }
                    }]
                }
            },
            "possibleIntents": [{
                "intent": "actions.intent.OPTION",
                "inputValueData": {
                    "carouselSelect": {
                        "items": [{
                                "optionInfo": {
                                    "key": "option",
                                    "synonyms": []
                                },
                                "title": "Title",
                                "description": "nbkbb"
                            },
                            {
                                "optionInfo": {
                                    "key": "option 2",
                                    "synonyms": []
                                },
                                "title": "Title 2",
                                "description": "rghbrhrrh"
                            }
                        ]
                    },
                    "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec"
                }
            }]
        }],
        "responseMetadata": {
            "status": {
                "message": "Success (200)"
            },
            "queryMatchInfo": {
                "queryMatched": true,
                "intent": "68135175-be79-4648-8752-48e9b6f432b5",
                "parameterNames": [
                    "password"
                ]
            }
        }
    });




});


restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});