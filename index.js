var mymap = L.map('mapid').setView([37.104041, 25.378693], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFub3NjaHIiLCJhIjoiY2sxOThlMzlxMXU3ZDNwcGY3emNqNHFhbSJ9.vMfY-wblgP-9B6VgdO7cKw', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.light',
	accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// add marker
var marker = L.marker([37.104041, 25.378693]).addTo(mymap);

// popup
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// click on map event
var popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}

mymap.on('click', onMapClick);