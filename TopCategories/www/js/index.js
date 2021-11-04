var app = {
    initialize: function () 
    {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () 
    {
        // Cordova is now initialized. Have fun!
        alert('Running cordova-' + cordova.platformId + '@' + cordova.version);
        this.receivedEvent('deviceready');

    },
    receivedEvent: function (id)
    {
        var parentElement = document.getElementById(id);
        parentElement.classList.add('ready');

    }

}
//AIzaSyAH6DaDUOd7wSb1pwYNH2PA5lvExEAmZEQ
let stateMap = document.getElementById("google_map");
let viewer = document.getElementById("map");
let map;

function googleMap()
{

    if (stateMap.innerHTML === "Google map") {
        navigator.geolocation.getCurrentPosition
            (onMapSuccess, onMapError, { enableHighAccuracy: true });

        stateMap.innerHTML = " Close map";
    }
    else {
        viewer.style.display = "none";
        stateMap.innerHTML = "Google map";

    }
}


var onMapSuccess = function (position)
{
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    initMap(Latitude, Longitude);

}

function initMap(latitude, longitude)
{
    var LatLong = new google.maps.LatLng(latitude, longitude);
    var mapOption = {
        center: LatLong,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    viewer.style.display = "block";
    map = new google.maps.Map(viewer, mapOption);

}
//AIzaSyB0dtNMb8xZh0aMLX4P-KiNccovF1w2tpM
// MOI AIzaSyBalI6eUBf2_r4hfmTYrj6A4ddFxTpg3hY
function onMapError(error)
{
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

app.initialize();

stateMap.addEventListener('click', googleMap, false);
/*window.addEventListener("batterystatus", onBatteryStatus, false);
window.addEventListener("batterylow", onBatteryLow, false);
window.addEventListener("batterycritical", onBatteryCritical, false);
function onBatteryStatus(status)
{
    alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function onBatteryLow(status)
{
    alert("Battery Level Low " + status.level + "%");
}

function onBatteryCritical(status)
{
    alert("Battery Level Critical " + status.level + "%\nRecharge Soon!");
}

navigator.camera.cleanup(onSuccess, onFail);

function onSuccess()
{
    alert("Camera cleanup success.")
}

function onFail(message)
{
    alert('Failed because: ' + message);
}*/