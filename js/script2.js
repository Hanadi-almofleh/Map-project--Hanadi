var locations = [
    ['Jeddah', 21.285407, 39.237551, 105343],{infoContent: ''},
    ['Tabuk', 28.383508, 36.566191, 101628],{infoContent: ''},
    ['Umm Lajj', 25.021259, 37.268501, 100926],{infoContent: ''},
    ['Abha', 18.246468, 42.511724, 110690],{infoContent: ''},
    ['Dammam', 26.43442, 50.10326, 110336],{infoContent: ''},
    ['Riyadh', 24.713552, 46.675296, 108410],{infoContent: ''}
];

// make global variable to get access in all functions
var gMap;
var markers = [];
var infoWindows = [];
var contents = [];
var locationsLength = locations.length;
var infoContent = "city";

/*    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/forecast?id=100926&APPID=d6b7e573f1e57b0a224436f0e0aa716d&units=metric&country=SA',
        type: 'GET',
        dataType: 'json',
        //async: !1, // this line to read the content 
        success: function(response, content) {
            infoContent = '<div class="info"><h4>' + response.city.name + "</h4> <p>" + response.list[0].weather[0].description +
                '</p><h6><img src="http://openweathermap.org/img/w/' + response.list[0].weather[0].icon +
                '.png" alt="weather description"> ' + response.cnt + "° </h6></div>";
                contents[0]=infoContent;
               console.log("contents[0]"+contents[0]);
        },
        error: function() {
            infoContent = "sorry, Their is error while Loading weather information..please try again..";

        }
    });
console.log("global");*/

function locationWeather( i) {
    //console.log('locationweather');
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + locations[i][3] + '&APPID=d6b7e573f1e57b0a224436f0e0aa716d&units=metric&country=SA';
    //uncomment this line to check error API 
    //weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + id + '&APPID=6b7e573f1e57b0a224436f0e0aa716d&units=metric&country=SA'; 

    $.ajax({
        url: weatherUrl,
        type: 'GET',
        dataType: 'json',
        //async: !1, // this line to read the content 
        success: function(response, content) {
            //console.log(response);
            /* console.log("city:"+response.city.name);
            console.log("temp"+response.cnt);
            console.log("desc:"+response.list[0].weather[0].description);
            console.log("icon:"+response.list[0].weather[0].icon);
            console.log("lat:"+response.city.coord.lat);
            console.log("icon:"+response.city.coord.lon);
            console.log("icon:"+response.city.id); */

            //content of infow window
            locations[i].infoContent = '<div class="info"><h4>' + response.city.name + "</h4> <p>" + response.list[0].weather[0].description +
                '</p><h6><img src="http://openweathermap.org/img/w/' + response.list[0].weather[0].icon +
                '.png" alt="weather description"> ' + response.cnt + "° </h6></div>";
                //contents[0]=infoContent;
               console.log("contents[0]"+locations[i].infoContent );
        },
        error: function() {
            infoContent = "sorry, Their is error while Loading weather information..please try again..";

        }
    });
    return infoContent;
}




//
function googleMap() {
    console.log('initmap');
    var coordinates = {
        lat: 24.713552,
        lng: 46.675296
    };

    gMap = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 5
    });



   /* $.ajax({
        url:'http://api.openweathermap.org/data/2.5/forecast?id=105343&APPID=d6b7e573f1e57b0a224436f0e0aa716d&units=metric&country=SA',
        type: 'GET',
        dataType: 'json',
        //async: !1, // this line to read the content 
        success: function(response, content) {
            console.log("ssuccess");
            infoContent = '<div class="info"><h4>' + response.city.name + "</h4> <p>" + response.list[0].weather[0].description +
                '</p><h6><img src="http://openweathermap.org/img/w/' + response.list[0].weather[0].icon +
                '.png" alt="weather description"> ' + response.cnt + "° </h6></div>";
                contents[0]=infoContent;
               console.log("contents[0]"+contents[0]);
        },
        error: function() {
            infoContent = "sorry, Their is error while Loading weather information..please try again..";

        }
    });*/
    // update center when resize the page
    google.maps.event.addDomListener(window, 'resize', function() {
        gMap.setCenter(coordinates);
    });
     
   // google.maps.event.addDomListener(window, 'load', pins);
    pins();
   

   
       


   // gMap.onload = 
    function pins() {
        
        for (var i = 0; i < locationsLength; i++) {
            addPin(i);
        }
    }


    //add marker function
    var id;

    function addPin(i) {
        console.log("addPin");
        // for (var i = 0; i < locationsLength ; i++) {
        id = locations[i][0];
        markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: gMap,
            animation: google.maps.Animation.DROP,
            title: id
        });

    //google.maps.event.addListenerOnce(gMap, 'tilesloaded', function(){
    //this part runs when the mapobject is created and rendered
     //   console.log("load gMap");
        //contents[i] = locationWeather(locations[i][3]);
        locationWeather(i);
        infoWindows[i] = new google.maps.InfoWindow({
           // content: contents[i]
        });
        infoWindows[i].setContent(locations[i].infoContent);
        //console.log("content value: "+contents[i]);
        //once clicks on the marker
   // });
   //  $(document).ready(function() {
  
 
        markers[i].addListener('click', function clickPin() {
            
            infoWindows[i].open(gMap, markers[i]);
            this.setAnimation(google.maps.Animation.DROP);
        });
        //}end loop
    //});

    } // end function addPin

} // end function googleMap

//################ side menu #########################

function closeMenu() {
    document.getElementById("slideMenu").style.width = "0";
    //    console.log("close");
}

function openMenu() {
    document.getElementById("slideMenu").style.width = "250px";
}

//################ Side menu end #########################

//################ knockout js part #########################


// This is a viewmodel
var MapViewModel = function(cities) {
    var self = this;
    self.enterLocation = ko.observable("");
    self.city = ko.observableArray(cities);
    self.resultCity = ko.observableArray();


    self.fn = ko.computed(function() {
        self.resultCity = ko.observableArray([]);
        var enteredVal = self.enterLocation().toLowerCase();
        for (var i = 0; i < cities.length; i++) {
            // console.log("city:"+cities[i]+" enter value: "+ enteredVal+ " indes "+cities[i].indexOf(enteredVal));
            if ((cities[i].toLowerCase().indexOf(enteredVal)) >= 0) {
                self.resultCity().push(cities[i]);
                if (markers[i] !== undefined)
                    markers[i].setVisible(true);
            } else
            if (markers[i] !== undefined)
                markers[i].setVisible(false);

        }

        return self.resultCity();

    });

    self.info = function(city) {
        //console.log("infowindow" + city);
        var i = cities.indexOf(city);
        infoWindows[i].open(gMap, markers[i]);
        markers[i].setAnimation(google.maps.Animation.DROP);
    };
    // console.log("city:"+ this.city[0]);          
}; //view modal

var cities = ['Jeddah', 'Tabuk', 'Umm Lajj', 'Abha', 'Dammam', 'Riyadh'];
// var cities =[locations[0][0], locations[1][0], locations[2][0], locations[3][0],locations[4][0], locations[5][0]];
ko.applyBindings(new MapViewModel(cities));

//################### End knockout js part ######################
