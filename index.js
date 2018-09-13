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
                "initialPrompts": [{
                    "textToSpeech": "Alright! Here are a few things you can learn. Which sounds interesting?"
                }],
                "noInputPrompts": []
            },
            "possibleIntents": [{
                "intent": "actions.intent.OPTION",
                "inputValueData": {
                    "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                    "carouselSelect": {
                        "items": [{
                                "optionInfo": {
                                    "key": "MATH_AND_PRIME",
                                    "synonyms": [
                                        "math",
                                        "math and prime",
                                        "prime numbers",
                                        "prime"
                                    ]
                                },
                                "title": "Math & prime numbers",
                                "description": "42 is an abundant number because the sum of its proper divisors 54 is greater…",
                                "image": {
                                    "url": "http://example.com/math_and_prime.jpg",
                                    "accessibilityText": "Math & prime numbers"
                                }
                            },
                            {
                                "optionInfo": {
                                    "key": "EGYPT",
                                    "synonyms": [
                                        "religion",
                                        "egpyt",
                                        "ancient egyptian"
                                    ]
                                },
                                "title": "Ancient Egyptian religion",
                                "description": "42 gods who ruled on the fate of the dead in the afterworld. Throughout the under…",
                                "image": {
                                    "url": "http://example.com/egypt",
                                    "accessibilityText": "Egypt"
                                }
                            },
                            {
                                "optionInfo": {
                                    "key": "RECIPES",
                                    "synonyms": [
                                        "recipes",
                                        "recipe",
                                        "42 recipes"
                                    ]
                                },
                                "title": "42 recipes with 42 ingredients",
                                "description": "Here's a beautifully simple recipe that's full of flavor! All you need is some ginger and…",
                                "image": {
                                    "url": "http://example.com/recipe",
                                    "accessibilityText": "Recipe"
                                }
                            }
                        ]
                    }
                }
            }]
        }]
    });




});


restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});