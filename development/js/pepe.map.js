window.pepe = window.pepe || {};

pepe.googleMap = function() {
    var _self = this;
    var position = new google.maps.LatLng(45.6234026, -72.945762);

    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

    var mapOptions = {
        zoom: 16,
        disableDefaultUI: false,
        scrollwheel: false,
        center: position,
        styles: this.mapStyle
    };

    var mapElement = document.getElementById('map');

    var map = new google.maps.Map(mapElement, mapOptions);

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Pépé Trattoria'
    });

    var infowindow = new google.maps.InfoWindow({
        content: $('#footer address').html()
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}
