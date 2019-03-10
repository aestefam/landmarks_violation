'use strict'

console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWVzdGVmYW0iLCJhIjoiY2pza214NHVsMmJtbzQ0czdzazQ3OTUzayJ9.aN7d8MlCodcKoa4mXDc-aw'
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aestefam/cjsuw3ms88p5q1gqgvx02sz4q',
    center: [-73.96184,40.80878],
    zoom: 12
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})
map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})
map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event) {

   
    let features = map.queryRenderedFeatures({ layers: ['Landmark Violations'] })
    console.log(features)

       let current_location = [event.coords.longitude, event.coords.latitude]
    console.log("Click location:", current_location)

       if (features.length == 0) return

       let closest_distance = Infinity
    let closest_feature = null

       for (let feature of features) {

           let distance = turf.distance(turf.point(feature.geometry.coordinates), turf.point(current_location))
    
        if (distance < closest_distance) {
            closest_distance = distance
            closest_feature = feature
        }        

    }
 
    console.log("Closest feature:", closest_feature.geometry.coordinates, "(", closest_distance, "m)")

     // calculate bearing
    let bearing = turf.bearing(turf.point(current_location), turf.point(closest_feature.geometry.coordinates))
    console.log("Bearing:", bearing)

    // turn the pointer in that direction
    var pointer = document.getElementById('pointer')
    pointer.style.transform = 'rotate(' + bearing + 'deg)'

    map.flyTo({ center: current_location })

})

