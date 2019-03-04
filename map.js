
'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWVzdGVmYW0iLCJhIjoiY2pza214NHVsMmJtbzQ0czdzazQ3OTUzayJ9.aN7d8MlCodcKoa4mXDc-aw'
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aestefam/cjsuw3ms88p5q1gqgvx02sz4q',
    center: [-46.656736,-23.605342],
    zoom: 12


    })

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
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

// this is an event handler
geolocate.on('geolocate', function(event) {
   console.log(event.coords)
    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)
})




