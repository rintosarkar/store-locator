var map;
var markers = [];
var infoWindow;

function initMap() {
  var losangels = { lat: 34.0522, lng: -118.2437 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losangels,
    // styles:styles,
    zoom: 8,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ hue: "#256bc2" }, { saturation: 48 }, { lightness: 8 }],
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }],
      },
    ],
  });
  infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    position: losangels,
    map: map,
    title: "Hello World!",
  });
  searchStores();
  // displayStores();
  // showStoresMarker();
  // setOnClickListener();
}

function setOnClickListener(stores) {
  var storeElements = document.querySelectorAll(".store-container");
  // console.log(storeElements);
  storeElements.forEach(function (elem, index) {
    elem.addEventListener("click", function () {
      google.maps.event.trigger(markers[index], "click");
    });
  });
}

function displayStores(stores) {
  var storesHtml = "";
  stores.forEach(function (store, index) {
    let address = store.addressLines;
    let phoneNumber = store.phoneNumber;
    storesHtml += ` 
       <div class="store-container">
       <div class="store-container-background">
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
           <div class="store-number">${index + 1}</div>
       </div>
       </div>
   </div>
   `;
  });
  document.querySelector(".stores-list").innerHTML = storesHtml;
}

function showStoresMarker(stores) {
  var bounds = new google.maps.LatLngBounds();

  stores.forEach(function (store, index) {
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
    createMarker(latlng, name, address, status, phone, index);
    map.fitBounds(bounds);
  });
}

function createMarker(latlng, name, address, status, phone, index) {
  var html = `
        <div class="store-info-window">
            <div class="store-info-name">${name}</div>
            <div class="store-info-status">
            <i class="far fa-clock"></i>
                ${status}
            </div>
            <div class="store-info-address">
                <div class="circle">
                    <i class="fas fa-location-arrow"></i> 
                </div>
                  ${address} 
            </div>
            <div class="store-info-phone">
            <div class="circle">
                <i class="fas fa-phone-alt"></i> 
            </div> 
                ${phone}
            </div>
        </div>
    `;
  url = "img/cup3.png";
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    icon: url,
    label: `${index + 1}`,
  });
  google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });

  markers.push(marker);
}

function searchStores() {
  var zipCode = document.getElementById("zip-code-input").value;
  var foundStores = [];
  if (zipCode) {
    stores.forEach(function (store) {
      var postal = store.address.postalCode.substring(0, 5);
      if (postal == zipCode) {
        foundStores.push(store);
      }
    });
  } else {
    foundStores = stores;
  }
  clearLocation();
  displayStores(foundStores);
  showStoresMarker(foundStores);
  setOnClickListener(foundStores);

  // console.log(zipCode);
}

function clearLocation() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
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
