var map;
var service;
var infowindow;

var vm = new Vue({
    el: "#app",
    data: {
        address: "algiers",
        position: {
            lat: 0,
            lng: 0
        },
        type: "restaurant",
        distance: 1000
    },
    methods: {
        render: function() {
            var myPosition = new google.maps.LatLng(this.position.lat, this.position.lng);
            map = new google.maps.Map(document.getElementById('map'), {
                center: myPosition,
                zoom: 14
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
        },

        getLocation: function(address) {
            var geocoder = new google.maps.Geocoder();
            var lat = 0,
                lng = 0;

            geocoder.geocode({ 'address': address }, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    vm.position.lat = results[0].geometry.location.lat();
                    vm.position.lng = results[0].geometry.location.lng();
                    vm.render();
                }
            });

        }
    },

    mounted: function() {
        this.getLocation(this.address);
    }
})