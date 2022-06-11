const mapStyle = {
    id: "O_SM",
    version: 8,
    name: "OSM Street",
    glyphs: "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
    sources: {
        "oda-street": {
            minzoom: 0,
            maxzoom: 18,
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
        },
    },
    layers: [
        {
            id: "O_SM",
            source: "oda-street",
            type: "raster",
            layout: {
                visibility: "visible",
            }
        }
    ]
    
}
var map = new maplibregl.Map({
    container: 'map',
    zoom: 10,
    center: [29.522491421013182, 37.876130128198263],
    style: mapStyle
});
map.on('load', ()=>{
    map.addSource('konya', {
        'type': 'geojson',
        'data': health,
        cluster: true,
                    
        clusterMaxZoom: 22,
        clusterRadius: 30
    })
    map.addLayer({
        'id': 'clusters-konya',
        'type': 'circle',
        'source': 'konya',
        'filter': ['has', 'point_count'],
        'paint': {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                "blue",
                50,
                "yellow",
                100,
                "red"
                ],
            
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                50,
                20,
                100,
                25
                ]
        }

    });
    map.addLayer({
        'id': 'clusters-count-konya',
        'type': 'symbol',
        'source': 'konya',
        'filter': ['has', 'point_count'],
        'layout': {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Roboto Medium'],
            'text-size': 12
        }
    });
    map.addLayer({
        id: 'point-konya',
        type: 'circle',
        source: 'konya',
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 10,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        },
        'filter': ['!',['has','point_count']]
    });
    
});