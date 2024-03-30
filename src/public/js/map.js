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
        radius: getRadius(population),
        pane: 'circles'
    }).addTo(map)
}

function getRadius(population) {
    if(population >= 5000000)
        return 8;
    if(population >= 1000000)
        return 7;
    if(population >= 100000)
        return 6;
    return 5;
}
