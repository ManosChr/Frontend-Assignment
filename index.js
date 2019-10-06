/**
 * Get data per ship from API for the previousDaysNumber by ship_id
 * 
 * @param {*} id 
 * @param {*} previousDaysNumber 
 */
async function getShipData(id, previousDaysNumber) {
	const response = await fetch(`https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:daily/days:${previousDaysNumber}/shipid:${id}/protocol:jsono`);
	const myJson = await response.json();
	return myJson;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function range(start, end) {
	return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

async function createShipData(numOfShips=10, previousDaysNumber = 10) {
	clearMap();
	// Resolve all promises returned from API
	let result = await Promise.all(range(1, numOfShips)
		.map(e => getShipData(e, previousDaysNumber)));
	
	// Filter empty responses from the result array and reverse it
	let filteredArray = result.filter(o => o.length > 0).map(a=>a.reverse());
	
	displayShip(filteredArray);
}
var mymap = L.map('mapid').setView([0, 0], 2);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoibWFub3NjaHIiLCJhIjoiY2sxOThlMzlxMXU3ZDNwcGY3emNqNHFhbSJ9.vMfY-wblgP-9B6VgdO7cKw'
}).addTo(mymap);

var cluster = L.markerClusterGroup();

function clearMap(){
	console.log(mymap);
	cluster.clearLayers();
	mymap._layers['51'] = null;
	mymap._layers['52'] = null;
	mymap._layers['53'] = null;
	// mymap._layers.forEach(e => removeLayer(e));
	// mymap.clearLayers();
	
}

// createShipData(10,10);

function displayShip(sortedShipsPerDayArray){
	

	let listOfMarkers = sortedShipsPerDayArray.map(point => {
		let m = L.marker([point[0].LAT, point[0].LON]);
        //we set the offset of the latest date market to always be on top (clicable) 
        m.setZIndexOffset(100);
		cluster.addLayer(m);

		//we pass the original object for later manipulation
		m.apiOBJECT = point;
		m.apiOBJECT.showPrevious = false;
		m.apiOBJECT.previousMarkers = [];
		m.apiOBJECT.routeColor = getRandomColor();
		return m;
	});

	//Adding clustering https://github.com/Leaflet/Leaflet.markercluster#examples (lib used)
	mymap.addLayer(cluster);

	//On click marker handler to toggle the previous location of a ship
	listOfMarkers.forEach(m => m.on('click', function (e) {
		if (!m.apiOBJECT.showPrevious){

            //create the polilines for this ships path
            m.apiOBJECT.polilines = L.polyline(
                [m.apiOBJECT.map(el=> [el.LAT, el.LON])],
                { color: m.apiOBJECT.routeColor}).addTo(mymap);
                
            //create previous locations marks for this ship
            m.apiOBJECT.previousMarkers = m.apiOBJECT.map((el,index)=> L.marker([el.LAT, el.LON],  {
                icon: new L.DivIcon({
                    className: 'my-div-icon',
                    html: `<img class="my-div-image" src="./ferry-15.svg"/>
                           <b>${index}</b>`
                })}).addTo(mymap));
            
			m.apiOBJECT.showPrevious = !m.apiOBJECT.showPrevious;
		}else{
            mymap.removeLayer(m.apiOBJECT.polilines);
			m.apiOBJECT.previousMarkers.forEach(subM => mymap.removeLayer(subM));
            m.apiOBJECT.showPrevious = !m.apiOBJECT.showPrevious;
		}
	}));
	//On click marker handler to toggle the previous location of a ship
	listOfMarkers.forEach(m => m.bindPopup("<b>MMSI:"+m.apiOBJECT[0].MMSI+"</b><br>more details"))
}

document.getElementById('search_btn').addEventListener('click', (e) => {
	let numberOfShips = document.getElementById('numberOfShips').value;
	let numberOfDays = document.getElementById('numberOfDays').value;
	createShipData(numberOfShips, numberOfDays);
});

document.getElementById('clear_btn').addEventListener('click', (e) => {
	clearMap();
});

// function updateTextInput(val, id) {
// 	document.getElementById(id).value=val;

// 	// document.getElementById('textInput').innerHTML=val;
//   }