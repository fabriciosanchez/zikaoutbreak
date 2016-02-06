/// <reference path="../App.js" />

(function () {
    "use strict";

    var AirportCodes = [];

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            displayItemDetails();
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        var item = Office.cast.item.toItemRead(Office.context.mailbox.item);
        //$('#subject').text(item.subject);
        var message = "";
        var from;

        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            from = Office.cast.item.toMessageRead(item).from;

            Office.context.mailbox.item.body.getAsync(
            "text",
            { asyncContext: "This is passed to the callback" },
            function callback(result) {
                message = result.value;
                ParseMessage(message);

            });

        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            from = Office.cast.item.toAppointmentRead(item).organizer;
        }

        //if (from) {
        //    $('#from').text(from.displayName);
        //    $('#from').click(function () {
        //        app.showNotification(from.displayName, from.emailAddress);
        //    });
        //}
    }

    function getMatches(theString, theRegex) {
        return theString.match(theRegex).map(function (el) {
            var index = theString.indexOf(el);
            return [index, index + el.length - 1];
        });
    }


    function ParseMessage(StrMessage) {
        var re = /\b[A-Z]{3}\b/gm;

        var posicoes = getMatches(StrMessage, /\b[A-Z]{3}\b/gm);
        //$('#message').text(StrMessage);
        var text = "";
        for (var i = 0; i < posicoes.length; i++) {
            text = StrMessage.substring(posicoes[i][0], posicoes[i][1] + 1);
            if (!NotIATACode(text) && IsUnique(text, AirportCodes)) {
                AirportCodes.push(text);
            }
        }

        $('#regular').text(AirportCodes);
        var ShowMessage = false;

        if (AirportCodes.length != null && AirportCodes.length > 0) {
            
            var clevel = "";
            var table = $('#details');
            //app.showNotification(AirportCodes);

            for (var i = 0; i < AirportCodes.length; i++) {

                // $('#details > tbody:last-child').append('<tr><th>' + AirportCodes[i] + '</th><td class="' + clevel + '">Risk Level</td></tr>');

                //var url = 'http://zikaapi.azurewebsites.net/api/Airports/GetAirportRisk/' + AirportCodes[i];
                var url = 'https://localhost:44300/api/Airports/GetAirportRisk/' + AirportCodes[i];

                //app.showNotification(url);
                $.support.cors = true;

                $.ajax({
                    url: url,
                }).done(function (data) {
                    var clevel = "class" + data.RiskLevel;
                    //app.showNotification(clevel)
                    var textRisk = "Low risk";

                    switch (data.RiskLevel) {
                        case 1: textRisk = "Low risk"; break;
                        case 2: textRisk = "Medium risk"; break;
                        case 3: textRisk = "High risk"; break;
                    }

                    $('#details > tbody:last-child').append('<tr><th>' + data.Code + " - " + data.Name + '</th><td class="' + clevel + '">' + textRisk + '</td></tr>');

                }).fail(function (jqXHR, textStatus, errorThrown) {
                     //app.showNotification(errorThrown)
                });
            }

            //app.showNotification($('#details').child);
            
        }

        if ($('#details').children.length > 0)
            ShowMessage = true;

        if (ShowMessage) {
            $('.NoAirportFound').hide();
            $('.AirportFound').show();
        } else {
            $('.NoAirportFound').show();
            $('.AirportFound').hide();
        }
    }

    function NotIATACode(str) {
        var notIata = false;
        var ArrayNotIata = ['SUA', 'SEU', 'DAS', 'GOV', 'CIA', 'QUE', 'VOO',
                            'RIO', 'TAM', 'SAO', 'JET', 'BRL', 'FOR', 'THE',
                            'YOU', 'COM', 'NAO', 'SEM', 'SER', 'XXX', 'SEX',
                            'ONE', 'TWO', 'SIX', 'POR', 'SIM', 'ATE', 'AIR',
                            'INC', 'USD', 'EUA', 'DPE', 'FOP'];

        for (var i = 0; i < ArrayNotIata.length; i++) {
            if (str == ArrayNotIata[i]) {
                notIata = true;
                break;
            }
        }
        return notIata;
    }

    function IsUnique(str, AirportCodes) {

        var found = true;

        for (var i = 0; i < AirportCodes.length; i++) {
            if (AirportCodes[i] == str) {
                found = false;
            }
        }
        return found;
    }

})();