var map;
var service;
var infowindow;

var vm = new Vue({
    el: "#app",
    data: {
        myPosition: "algiers",
        type: "restaurant",
        distance: 1000
    },
    methods: {
        initialize: function() {
            var myPosition = new google.maps.LatLng(36.7538, 3.0588);
            map = new google.maps.Map(document.getElementById('map'), {
                center: myPosition,
                zoom: 15
            });

            var request = {
                location: myPosition,
                radius: this.distance,
                types: [this.type]
            };

            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, this.callback);
        },

        callback: function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    this.createMarker(results[i]);
                }
            }
        },

        createMarker: function(pos) {
            console.log(pos.geometry.location.lat());
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.geometry.location.lat(), pos.geometry.location.lng()),
            });

            marker.setMap(map);
        }
    },

    mounted: function() {
        this.initialize();
    }
})