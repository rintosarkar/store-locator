var map;
var markers = [];
var infoWindow;

function initMap() {
    var losangels = {lat: 34.0522, lng: -118.2437}
    map = new google.maps.Map(document.getElementById('map'), {
    center: losangels,
    // styles:styles,
    zoom: 8,
        styles: [{ 
            "featureType": "all", 
            "elementType": "geometry", 
            "stylers": [
                { "hue": "#256bc2" }, 
                { "saturation": 48 }, 
                { "lightness": 8 }] }, 
                { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                { "featureType": "poi.park", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }
            ]
            
    });
    infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
    position: losangels,
    map: map,
    title: 'Hello World!'
});
displayStores();
showStoresMarker();
}

function displayStores()
{
    var storesHtml = "";
    stores.forEach(function(store,index){
        let address = store.addressLines;
        let phoneNumber = store.phoneNumber;
       storesHtml += ` 
       <div class="store-container">
       <div class="store-info-container">
           <div class="store-address">
               <span>${address[0]}</span>
               <span>${address[1]}</span>
           </div>
           <div class="store-phone-number">
                ${phoneNumber}
           </div>
          
       </div>
       <div class="store-nubmer-container">
           <div class="store-number">${index+1}</div>
       </div>
   </div>
   `;
    });
    document.querySelector('.stores-list').innerHTML = storesHtml
}

function showStoresMarker(){
    var bounds = new google.maps.LatLngBounds();

    stores.forEach(function(store){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude
        );
        // console.log(latlng)
        var name = store.name;
        var address = store.addressLines[0];
        var status = store.openStatusText;
        var phone = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address,status,phone) 
        map.fitBounds(bounds);
    });
}




function createMarker(latlng, name, address,status,phone)
{
    var html = `
        <div class="store-info-window">
            <div class="store-info-name">${name}</div>
            <div class="store-info-status">${status}</div>
            <div class="store-info-address">${address} </div>
            <div class="store-info-phone">${phone}</div>
        </div>
    `;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        // icon: {
        //     url: "https://maps.gstatic.com/mapfiles/transparent.png"
        //   }
    });
    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent(html);
        infoWindow.open(map,marker);
    });

    markers.push(marker);
}


// function createMarker(latlng, name, address) {
//     var html = "<b>" + name + "</b> <br/>" + address;
//     var marker = new google.maps.Marker({
//       map: map,
//       position: latlng
//     });
//     google.maps.event.addListener(marker, 'click', function() {
//       infoWindow.setContent(html);
//       infoWindow.open(map, marker);
//     });
//     markers.push(marker);
//   }