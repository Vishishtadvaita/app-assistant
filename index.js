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
        "data": {
            "google": {
                "expect_user_response": true,
                // "permissions_request": "not sure what goes here, I usually leave it out"
            }
        },
        "messages": [{
            "items": [{
                    "description": "Option One Description",
                    "image": {
                        "url": "https://via.placeholder.com/140x100"
                    },
                    "optionInfo": {
                        "key": "itemOne",
                        "synonyms": [
                            "thing one",
                            "object one"
                        ]
                    },
                    "title": "Option One Title"
                },
                {
                    "description": "Option Two Description",
                    "image": {
                        "url": "https://via.placeholder.com/140x100"
                    },
                    "optionInfo": {
                        "key": "itemTwo",
                        "synonyms": [
                            "thing two",
                            "object two"
                        ]
                    },
                    "title": "Option Two Title"
                }
            ],
            "platform": "google",
            "type": "carousel_card"
        }],
        "contextOut": [{
            "name": "carousel",
            "lifespan": 5,
            "parameters": {
                "followup-event": "hero_selected"
            }
        }]
    });




});


restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});