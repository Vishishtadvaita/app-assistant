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
        "responseId": "f6b87d21-ec48-4399-9f80-b8bb89867c4a",
        "queryResult": {
            "queryText": "w",
            "action": "userId",
            "parameters": {
                "password": "w",
                "userId": "r"
            },
            "allRequiredParamsPresent": true,
            "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [{
                            "textToSpeech": "this is your attendance"
                        }]
                    }
                },
                {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "carouselSelect": {
                        "items": [{
                                "info": {
                                    "key": "option 1",
                                    "synonyms": [
                                        "synnoym"
                                    ]
                                },
                                "title": "Title",
                                "description": "asdasfs \\n sdsd",
                                "image": {
                                    "imageUri": "https://via.placeholder.com/128x232",
                                    "accessibilityText": "sasas"
                                }
                            },
                            {
                                "info": {
                                    "key": "option 2"
                                },
                                "title": "Title 2",
                                "description": "asdasdasdafaf",
                                "image": {
                                    "imageUri": "https://via.placeholder.com/128x232",
                                    "accessibilityText": "sSA"
                                }
                            },
                            {
                                "info": {
                                    "key": "option 3"
                                },
                                "title": "Title 3",
                                "description": "ascdascc",
                                "image": {
                                    "imageUri": "https://via.placeholder.com/128x232",
                                    "accessibilityText": "sass"
                                }
                            }
                        ]
                    }
                }
            ],
            "intent": {
                "name": "projects/technojam-app/agent/intents/68135175-be79-4648-8752-48e9b6f432b5",
                "displayName": "userId"
            },
            "intentDetectionConfidence": 1,
            "diagnosticInfo": {
                "end_conversation": true
            },
            "languageCode": "en"
        }
    });




});


restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});