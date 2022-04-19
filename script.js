const map = L.map('map');

//leaflet tiles (https://leaflet-extras.github.io/leaflet-providers/preview/)
var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//map.setView([48.210, 16.363], 13);

navigator.geolocation.watchPosition(onNewPosition, onError, {
    enableHighAccuracy: true
});

let distance = 0;
let lastPosition;
let polyline = L.polyline([], {color: "green"}).addTo(map);

function onNewPosition(data){
    console.log(data);

    let lat = data.coords.latitude;
    let lon = data.coords.longitude;

    if(!lastPosition){
        map.setView([lat, lon], 25);
    }

    //map.setView([48.210, 16.363], 13);

    let pos = L.latLng(lat, lon);
    polyline.addLatLng(pos);

    document.querySelector('#lat').innerHTML = Math.round(lat * 100) / 100;
    document.querySelector('#lon').innerHTML = Math.round(lon * 100) / 100;


    if (lastPosition){
        distance += pos.distanceTo(lastPosition);
        distance = Math.round(distance);

        document.querySelector('#distance').innerText = distance;
    }


    lastPosition = pos;


}

function onError(error){

}
