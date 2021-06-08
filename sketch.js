mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyZzRlIiwiYSI6ImNrcG4zbGE0bjE3YXgydm4yNmJoMXRqeHQifQ.HwfDD1-P2ORqxEXyDNDXGg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-100.04, 38.907],
        zoom: 3
    });

    map.on('load', function () {
        // Add a source for the state polygons.
        map.addSource('states', {
            'type': 'geojson',
            'data': 'ent.geojson'
        });

        // Add a layer showing the state polygons.
        map.addLayer({
            'id': 'states-layer',
            'type': 'fill',
            'source': 'states',
            'paint': {
                'fill-color': 'rgba(200, 100, 240, 0.4)',
                'fill-outline-color': 'rgba(200, 100, 240, 1)'
            }
        });

        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        map.on('click', 'states-layer', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.entidad_nombre)
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'states-layer', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'states-layer', function () {
            map.getCanvas().style.cursor = '';
        });
    });