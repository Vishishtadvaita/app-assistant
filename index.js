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
        "speech": "Hello",
        "contextOut": [{
            "name": "_actions_on_google_",
            "lifespan": 100,
            "parameters": {}
        }],
        "data": {
            "google": {
                "expectUserResponse": true,
                "richResponse": {
                    "items": [{
                        "simpleResponse": {
                            "textToSpeech": "Hello"
                        }
                    }],
                    "suggestions": []
                },
                "systemIntent": {
                    "intent": "actions.intent.OPTION",
                    "data": {
                        "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                        "carouselSelect": {
                            "items": [{
                                    "title": "Foo",
                                    "image": {
                                        "url": "http://example.com/foo.jpg",
                                        "accessibilityText": "Foo title"
                                    },
                                    "optionInfo": {
                                        "key": "foo-key",
                                        "synonyms": [
                                            "foo-alt-1",
                                            "foo-alt-2"
                                        ]
                                    }
                                },
                                {
                                    "title": "Bar",
                                    "image": {
                                        "url": "http://example.com/bar.jpg",
                                        "accessibilityText": "Bar title"
                                    },
                                    "optionInfo": {
                                        "key": "bar-key",
                                        "synonyms": [
                                            "bar-alt-1",
                                            "bar-alt-2"
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    });




});


restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});