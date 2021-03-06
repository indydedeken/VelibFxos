"use strict";

/***********
 * Stations
 ***********/

/**
 * Utility functions handling stations
 */
var Stations = (function() {
    /**
     * Decorate stations with their distance to a position
     * @param stations Station list
     * @param coords Position from which seeing stations
     */
    var computeDistances = function(stations, coords) {
        return stations.map(function(station) {
            station.distance = distance(coords, station.position);
            return station;
        });
    };

    /**
     * Returns the stations ordered by distance to the position identified by coords
     * @param stations Station list
     * @param coords Current position
     */
    var sortByDistance = function(stations, coords) {
        var orderedStations = computeDistances(stations, coords);
        orderedStations.sort(function(a, b) {
            return a.distance - b.distance;
        });
        return orderedStations;
    };

    /**
     * Returns formatted station informations object
     * @param station Station to format
     * @param coords Current position (can be omitted if station has a `distance` field)
     */
    var format = function(station, coords) {
        var formatted = {};

        console.log('Station.js', 'getFormattedStation In', station);

        // Station address and number
        formatted.address = station.address;
        formatted.number = station.number;

        // Availables bikes & stands
        formatted.availableBikes = station.availableBikes;
        formatted.availableStands = station.availableStands;

        // Last update
        if(station.lastUpdate != null) {
            var diff = dateDiff(station.lastUpdate);
            var text = "";

            if (diff.day > 1)
                text = diff.day + ' jours';
            else if (diff.day == 1)
                text = diff.day + ' jour';
            else if (diff.hour > 1)
                text = diff.hour + ' heures';
            else if (diff.hour == 1)
                text = diff.hour + ' heure';
            else if (diff.min > 1)
                text = diff.min + ' minutes';
            else if (diff.min == 1)
                text = diff.min + ' minute';
            else if (diff.sec > 1)
                text = diff.sec + ' secondes';
            else if (diff.sec == 1)
                text = diff.sec + ' seconde';
            else
                text = 'un instant';
            formatted.lastUpdate = text;
        }
        // distance
        var dist = station.distance || distance(coords, station.position);
        formatted.distance = (dist / 1000.0).toFixed(2) + " km";

        // latitude - longitude
        formatted.position = station.position.latitude.toFixed(2) + ' - ' + station.position.longitude.toFixed(2);

        console.log('Station.js', 'getFormattedStation Out', formatted);

        return formatted;
    };


    /**
     * Sort and filter station list until a given limit.
     * @param staions Station list
     * @param coords Current position
     * @param limit Max amount of stations to return (optionnal)
     * @param filter Filtering function (optionnal)
     * @return sorted filtered sliced station list
     */
    var filterClosestStations = function(stations, coords, limit, filter) {
        stations = sortByDistance(stations, coords);

        if (filter !== undefined) {
            stations.filter(filter);
        }

        if (limit !== undefined) {
            return stations.slice(0, limit);
        } else {
            return stations;
        }
    };

    return {
        format: format,
        filterClosestStations: filterClosestStations
    };
})();
