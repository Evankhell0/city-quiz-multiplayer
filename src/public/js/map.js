var myGeoJSONPath = 'geo2.json';
var myCustomStyle = {
    stroke: true,
    color: '#000', // Border color
    weight: 0.5,     // Border weight,
    fill: true,
    fillColor: '#fff',
    fillOpacity: 1
}

var map = L.map('map').setView([40, 0], 2);
map.createPane('circles');
var geojsonLayer = L.geoJson(null, {
    style: myCustomStyle
}).addTo(map);

$.getJSON(myGeoJSONPath,function(data){
    geojsonLayer.addData(data);
})

function addCircle(lat, lon, population) {
    var circle = L.circleMarker([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10,
        pane: 'circles'
    }).addTo(map)
}
