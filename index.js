
let data = [
	{
		"MMSI": "241486001",
		"STATUS": "0",
		"SPEED": "146",
		"LON": "0",
		"LAT": "0",
		"COURSE": "189",
		"HEADING": "190",
		"TIMESTAMP": "2017-07-12T10:06:00",
		"SHIP_ID": "4910654",
		"WIND_ANGLE": "340",
		"WIND_SPEED": "18",
		"WIND_TEMP": "12"
	},
	{
		"MMSI": "241486002",
		"STATUS": "0",
		"SPEED": "146",
		"LON": "2",
		"LAT": "2",
		"COURSE": "190",
		"HEADING": "191",
		"TIMESTAMP": "2017-07-12T10:06:00",
		"SHIP_ID": "4910655",
		"WIND_ANGLE": "17",
		"WIND_SPEED": "14",
		"WIND_TEMP": "11"
	},
	{
		"MMSI": "241486003",
		"STATUS": "0",
		"SPEED": "146",
		"LON": "-30",
		"LAT": "-30",
		"COURSE": "190",
		"HEADING": "191",
		"TIMESTAMP": "2017-07-12T10:06:00",
		"SHIP_ID": "4910656",
		"WIND_ANGLE": "99",
		"WIND_SPEED": "18",
		"WIND_TEMP": "13"
	},
	{
		"MMSI": "241486004",
		"STATUS": "0",
		"SPEED": "146",
		"LON": "40",
		"LAT": "40",
		"COURSE": "189",
		"HEADING": "191",
		"TIMESTAMP": "2017-07-12T10:06:00",
		"SHIP_ID": "4910657",
		"WIND_ANGLE": "105",
		"WIND_SPEED": "24",
		"WIND_TEMP": "15"
	}
];
var mymap = L.map('mapid').setView([0, 0], 2);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.light',
	accessToken: 'pk.eyJ1IjoibWFub3NjaHIiLCJhIjoiY2sxOThlMzlxMXU3ZDNwcGY3emNqNHFhbSJ9.vMfY-wblgP-9B6VgdO7cKw'
}).addTo(mymap);

var cluster = L.markerClusterGroup();

let listOfMarkers = data.map(point => {
	let m = L.marker([point.LON, -point.LAT]);
	cluster.addLayer(m);
	m.title = point.MMSI;
	m.prevMarkers = [];
	console.log(m._latlng)
	return m;
});

//CLUSTERING https://github.com/Leaflet/Leaflet.markercluster#examples (lib used)
mymap.addLayer(cluster);

let pathCoords = data.map(point => {
	let coordsArr = [];
	coordsArr.push(point.LON, point.LAT);
	return coordsArr;
});
var polyline = L.polyline(pathCoords).addTo(mymap);


listOfMarkers.forEach(m => m.bindPopup(`<b>MMSI:${m.title}</b><br>more details`))

listOfMarkers.forEach(m => m.bindPopup(`<b>MMSI:${m.title}</b><br>more details`))
listOfMarkers.forEach(m => m.on('mouseover', function (e) {
	console.log(e)
	let m1 = L.marker([m._latlng.lng + 3, m._latlng.lat + 3]).addTo(mymap);
	let m2 = L.marker([m._latlng.lng + 6, m._latlng.lat + 6]).addTo(mymap);
	let m3 = L.marker([m._latlng.lng + 1, m._latlng.lat + 1]).addTo(mymap);

	m.prevMarkers.push(m1);
	m.prevMarkers.push(m2);
	m.prevMarkers.push(m3);
}))
listOfMarkers.forEach(m => m.on('mouseout', (e) => m.prevMarkers.forEach(subM => mymap.removeLayer(subM))))