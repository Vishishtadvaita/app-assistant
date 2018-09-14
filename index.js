"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const rp = require('request-promise');

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



    let optionsForCallOne = {
        method: 'POST',
        "rejectUnauthorized": false,
        uri: 'https://gu.mastersofterp.in/rfcampusgu/j_spring_security_check',
        headers: {
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': '81',
            'Referer': 'adminlogin'
        }
    }

    optionsForCallOne.form = {
        username: '15SCSE101417-adminlogin',
        password: 'Shivam1997!',
        userType: 'mobile',
        captcha: 'mobile'
    }


    rp(optionsForCallOne)
        .then(body => {
            var tokenFromWeb = JSON.parse(body).UserInfo.Token;
            var idForTwo = JSON.parse(body).UserInfo.userId;

            let optionsForCallTwo = {
                method: 'POST',
                "rejectUnauthorized": false,
                uri: 'https://gu.mastersofterp.in/rfcampusgu/api/viewResolver',
                headers: {
                    'Connection': 'keep-alive',
                    'Accept-Encoding': 'gzip',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': '15',
                    'Referer': 'adminlogin',
                    'UaType': '5',
                    'token': tokenFromWeb,
                    'courseId': '0',
                    'registrationNo': '15SCSE101417',
                    'id': idForTwo,
                    'processId': '2'
                }
            }

            optionsForCallTwo.form = {
                'id': '15SCSE101417'
            }

            rp(optionsForCallTwo)
                .then(bodyTwo => {
                    data = JSON.parse(bodyTwo).AttendanceDetails;
                    var speech = '';
                    for (var i = 0; i < data.length; i++) {
                        var Course_Name = data[i].Course_Name;
                        var Total_Class = data[i].Total_Class;
                        var Absent = data[i].Absent;
                        var Percentage = data[i].Percentage;

                        var temp = "[" + Course_Name + "-" + Percentage + "% (" + Absent + '/' + Total_Class + ")" + "],"
                        speech = speech + temp;
                    }
                    // console.log(speech);
                }).catch(err => {
                    console.log(err);
                });


        }).catch(err => {
            console.log(err);
        });





















    return res.json({
        payload: {
            google: {
                expectUserResponse: false,
                richResponse: {
                    items: [{
                        simpleResponse: {
                            textToSpeech: speech,
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