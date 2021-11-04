var app = {
    initialize: function () 
    {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () 
    {

        navigator.notification.alert(
            'Running cordova-' + cordova.platformId + '@' + cordova.version,  // message
            alertDismissed,         // callback
            'Using cordova-plugin-dialogs',            // title
            'Done'                  // buttonName
        );
        navigator.vibrate(3000);
        this.receivedEvent('deviceready');

    },
    receivedEvent: function (id)
    {
        var parentElement = document.getElementById(id);
        parentElement.classList.add('ready');

    }

}

function alertDismissed()
{
    window.addEventListener("batterystatus", onBatteryStatus, false);
}

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

function onMapError(error)
{
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

app.initialize();

stateMap.addEventListener('click', googleMap, false);

function onBatteryStatus(status)
{
    alert("Your battery level is : " + status.level);
}


//AIzaSyB0dtNMb8xZh0aMLX4P-KiNccovF1w2tpM
// MOI AIzaSyBalI6eUBf2_r4hfmTYrj6A4ddFxTpg3hY