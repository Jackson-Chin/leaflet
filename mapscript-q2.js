const map = L.map('map', { 
    center: [40.0007, -83.0095], // -- NEW
    zoom: 17                  // -- NEW
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);   // on by default

const topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// Add the following
const quick_eats = [
    { name: "Qdoba Mexican Eats",  coords: [40.002265770114704, -83.00831544391653], note: "Tried once and it is good." },
    { name: "Red Chili",           coords: [40.0020812252386, -83.00827194929629], note: "Haven't been yet." },
    { name: "Smashburger",         coords: [39.999824185055225, -83.007835944253], note: "I like it, a little greasy though." },
    { name: "Dave's Hot Chicken",  coords: [39.99964518131456, -83.00783907331429], note: "Very good, spicy!" }
]

const convenience_stores = [
    {name: "Target", coords: [40.00094825710499, -83.00802044889093], note: "There is a Starbucks inside."}
]

// These may or may not be "landmarks", but a square and a garage are hard to miss 
const landmarks = [
    { name: "University Square",   coords: [40.00018911567196, -83.00766099251994], note: "Nice open space." },
    { name: "Union Garage North",  coords: [39.99895193757101, -83.00846543279417], note: "Shops and quick eats." }
];

function svgIcon(color) {
    return L.divIcon({
        className: 'poi-icon',
        html: `
            <svg width="25" height="32" viewBox="0 0 25 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.5 12.5 32 12.5 32S25 21.5 25 12.5C25 5.6 19.4 0 12.5 0z"
                    fill="${color}" stroke="#1c2b24" stroke-width="1"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
            </svg>`,
        iconSize:    [25, 32],  // match SVG's width/height
        iconAnchor:  [12, 32],  // the pinpoint — where the actual coordinate is at
        popupAnchor: [0, -28]   // where a popup opens relative to iconAnchor
    });
}

const QEATS_COLOR    = '#a6531c';
const LANDMARK_COLOR = '#1fbf78';
const STORE_COLOR    = '#1f78bf'

const college = [
    [40.0029902773675, -83.01082341784424],
    [40.00222914683255, -83.01066613770229], //
    [40.00029823980815, -83.01027760255613],
    [40.00012506372174, -83.00988669532954],
    [39.99963660599409, -83.00976593660397],
    [39.99933257652167, -83.01005876706844],
    [39.998264098365574, -83.00977736704833]
];

const eighteenth = [
    [40.00210617569432, -83.01144806171567],
    [40.00222914683255, -83.01066613770229], //
    [40.00244924246706, -83.00856239218395] //
]

const high = [
    [40.00300190629786, -83.0086674960556],
    [40.00244924246706, -83.00856239218395],  //
    [39.99855011031908, -83.00780731455644]
]

// coordinates are counterclockwise
const sullivant = [
    [39.99977929776927, -83.00841493416583],
    [39.999677029541665, -83.00921308794423],
    [39.99914496764892, -83.00912240362223],
    [39.99924310289973, -83.00830671856693]
];

const mershon = [
    [40.00084315443416, -83.00872402775812],
    [40.00078666285384, -83.00927991371994],
    [40.00055978586938, -83.00930828619622],
    [40.000263841596734, -83.00924766599098],
    [40.000336902791105, -83.00861261156793]
];

// polygon with holes
// make sure the exterior is counterclockwise and all interiors are clockwise
const varsity = [
    // outer ring
    [
        [40.00186274625445, -83.00764495057426],
        [40.00179805243919, -83.00826414094233],
        [40.00092085624277, -83.0080915186693],
        [40.00099417919893, -83.00747421703964]
    ],
    // first hole
    [
        [40.00164607696715, -83.00802011772734],
        [40.00166897510807, -83.00782073636937],
        [40.00149216790312, -83.00780556394065],
        [40.00147636032451, -83.007971901448]
    ],
    // south hole
    [
        [40.00131829901151, -83.00793823080045],
        [40.00134008864003, -83.00776928111307],
        [40.00114019737254, -83.00772226278664],
        [40.00113232740786, -83.00788252226585]
    ]
]

// multipolygon
const north = 
[
    // polygon 1
    [
        // first ring -- only has one ring
        [
            [40.00080709986908, -83.00743817721026],
            [40.00073163468352, -83.00805064955155],
            [40.000391891227586, -83.0079714705864],
            [40.000448236691675, -83.00738776372576]
        ]
    ],
    // polygon 2
    [
        [
            [39.999936975900084, -83.00728328368214],
            [39.999852022621155, -83.0078687391096],
            [39.99951167483587, -83.00779740667336],
            [39.99958036477668, -83.00719633056939]
        ]
    ]
]

const radar = L.tileLayer.wms('https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi', {
    layers: 'nexrad-n0r',
    format: 'image/png',
    transparent: true,
    attribution: 'Weather data &copy; Iowa Environmental Mesonet'
}).addTo(map);

// 1. Make 3 layer groups for the points

const qeatsLayer = L.layerGroup(
    quick_eats.map(f => L.marker(f.coords, { icon: svgIcon(QEATS_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const storesLayer = L.layerGroup(
    convenience_stores.map(f => L.marker(f.coords, { icon: svgIcon(STORE_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const landmarksLayer = L.layerGroup(
    landmarks.map(f => L.marker(f.coords, { icon: svgIcon(LANDMARK_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

// 2. Create one layer group for all streets
const linesLayer = L.layerGroup([
    L.polyline(college, { color: '#a6531c', weight: 4 }),
    L.polyline(eighteenth, { color: '#a6531c', weight: 4 }),
    L.polyline(high, { color: '#a6531c', weight: 4 })
]);

// 3. Create one layer group for all buildings
const polygon_style = {color: '#1f6f78', fillColor: '#1f6f78', fillOpacity: 0.25};

const buildingLayer = L.layerGroup([
    L.polygon(sullivant, polygon_style).bindTooltip('Billy Ireland Cartoon Library & Museum', { direction: 'top', offset: [0, -8]}),
    L.polygon(mershon, polygon_style),
    L.polygon(north, polygon_style),
    L.polygon(varsity, polygon_style)
])

// 4. Create the control with all layers
L.control.layers(
    { "Streets": streets, "Topographic": topo, "Satellite": satellite, "OpenStreetMap": osm },
    { "Quick eats": qeatsLayer, "Stores": storesLayer, "Landmarks": landmarksLayer, 
        "Streets": linesLayer, "Buildings": buildingLayer, "Radar": radar }
).addTo(map);
