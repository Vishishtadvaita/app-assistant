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
        "conversationToken": "{\"state\":null,\"data\":{}}",
        "expectUserResponse": true,
        "expectedInputs": [{
            "inputPrompt": {
                "richInitialPrompt": {
                    "items": [{
                        "simpleResponse": {
                            "textToSpeech": "This is a simple response for a carousel"
                        }
                    }],
                    "suggestions": [{
                            "title": "Basic Card"
                        },
                        {
                            "title": "List"
                        },
                        {
                            "title": "Carousel"
                        },
                        {
                            "title": "Suggestions"
                        }
                    ]
                }
            },
            "possibleIntents": [{
                "intent": "actions.intent.OPTION",
                "inputValueData": {
                    "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                    "carouselSelect": {
                        "items": [{
                                "optionInfo": {
                                    "key": "title",
                                    "synonyms": [
                                        "synonym of title 1",
                                        "synonym of title 2",
                                        "synonym of title 3"
                                    ]
                                },
                                "title": "Title of First List Item",
                                "description": "This is a description of a carousel item",
                                "image": {
                                    "url": "/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                                    "accessibilityText": "Image alternate text"
                                }
                            },
                            {
                                "optionInfo": {
                                    "key": "googleHome",
                                    "synonyms": [
                                        "Google Home Assistant",
                                        "Assistant on the Google Home"
                                    ]
                                },
                                "title": "Google Home",
                                "description": "Google Home is a voice-activated speaker powered by\n the Google Assistant.",
                                "image": {
                                    "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                                    "accessibilityText": "Google Home"
                                }
                            },
                            {
                                "optionInfo": {
                                    "key": "googlePixel",
                                    "synonyms": [
                                        "Google Pixel XL",
                                        "Pixel",
                                        "Pixel XL"
                                    ]
                                },
                                "title": "Google Pixel",
                                "description": "Pixel. Phone by Google.",
                                "image": {
                                    "url": "https://storage.googleapis.com/madebygoog/v1/Pixel/Pixel_ColorPicker/Pixel_Device_Angled_Black-720w.png",
                                    "accessibilityText": "Google Pixel"
                                }
                            },
                            {
                                "optionInfo": {
                                    "key": "googleAllo",
                                    "synonyms": [
                                        "Allo"
                                    ]
                                },
                                "title": "Google Allo",
                                "description": "Introducing Google Allo, a smart messaging appthat helps you say more and do more.",
                                "image": {
                                    "url": "https://allo.google.com/images/allo-logo.png",
                                    "accessibilityText": "Google Allo Logo"
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