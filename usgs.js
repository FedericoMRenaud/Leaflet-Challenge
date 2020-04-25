// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createMap(data.features);
});


function createMap(earthquakeMap) {
    var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
      });
      
      var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
      });
      

    var baseMaps = {
            "light": light,
            "Dark Map": dark
    };

    var myMap = L.map("map", {
        center: [34.0522, -118.2437],
        zoom:4,
        layers: light
    });

   // L.circle(countries[i].location, {
     //   fillOpacity: 0.75,
       // color: "white",
        //fillColor: color,
        // Adjust radius
       // radius: countries[i].points * 1500
     // }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
    //}
    

    earthquakeMap.forEach(data => {        
        if (data.geometry) {
            let coord = [data.geometry.coordinates[1], data.geometry.coordinates[0]]
            return L.circle(coord, {
                radius: data.properties.mag * 35000,
                color: "black",
                //fillColor: color,
                fillColor: magColor(data.properties.mag),
                fillOpacity: 0.75,
                weight: 0.5
            }).bindPopup("<h2>Epicenter: " + data.properties.title + "</h2> <hr> <h4>Earthqueake Magnitude: " + data.properties.mag + "</h4>").addTo(myMap);
        }
    })
    

    //for (var i = 0; i < data.features; i++) {

        // Conditionals for countries points
      //  var color = "";
        //if (properties[i].mag > 7) {
         // color = "red";
        //}
        //else if (properties[i].mag > 6) {
          //color = "darkred";
        
        //}
        //else if (properties[i].mag > 5) {
         // color = "crimson";
        //}
        //else if (properties[i].mag > 4) {
          //  color = "orange";
          //}
          //else if (properties[i].mag > 3) {
            //color = "coral";
          //}
          //else if (properties[i].mag > 2) {
            //color = "gold";
          //}
          //else if (properties[i].mag > 1) {
            //color = "greenyellow";
          //}
        //else {
          //color = "lightgreen";
        //}
      
    function magColor(magnitudeColor) {
        return magnitudeColor > 7 ? 'red':
        magnitudeColor > 6 ? 'darkred': 
        magnitudeColor > 5 ? 'crimson':
        magnitudeColor > 4 ? 'orange':
        magnitudeColor > 3 ? 'coral':
        magnitudeColor > 2 ? 'gold':
        magnitudeColor > 1 ? 'greenyellow': 'lightgreen';
    }
    L.control.layers(baseMaps).addTo(myMap); 
    
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");

      var legendInfo = "<h1>Magnitude</h1>" +
      "<li>>7:red</li>" + "<li>>6:darkred</li>" + "<li>>5:crimson</li>" + 
      "<li>>4:orange</li>"+ "<li>>3:coral</li>" + "<li>>2:gold</li>" + 
      "<li>>1:lightgreen</li>";

      div.innerHTML = legendInfo;

      return div;

      legend.addTo(myMap);

     // limits.forEach(function(limit, index) {
       // labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
     // });
  
      //div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      //return div;
    };
  

}
