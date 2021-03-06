"use strict";

/****************
 * Configuration
 ****************/

var Config = (function() {
    var tilesProvider = 'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
    var apiKey = '5eec7c1a3babb6b2abeabb0143c635d2d9aff1c3';
    var stationsBaseUrl = 'https://api.jcdecaux.com/vls/v1/stations?contract=paris&apiKey=';
    var realtimeUrl = 'https://api.jcdecaux.com/vls/v1/stations/{station_number}?contract=paris&apiKey=';

    return {
        tilesProvider: tilesProvider,
        stationsUrl: stationsBaseUrl + apiKey,
        realtimeUrl: realtimeUrl + apiKey,
        max_starred_stations: 10,
        geolocation: {
            enableHighAccuracy: true,
            maximumAge: 10000
        },
        waitPositionTimeout: 1000, /* in ms */
        waitStationsTimeout: 1000, /* in ms */
        localStationStorageTimeout: 30 * 24 * 3600 * 1000 /* in ms */
    };
})();
