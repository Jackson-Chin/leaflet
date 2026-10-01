const map = L.map('map', { 
    center: [41.43016555778457, -81.39152017280479], // -- Chagrin Falls, OH (my hometown)
    zoom: 17
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

// point festures
const dinner_spots = [
    { name: "Yours Truly", coords: [41.43066614284098, -81.3913822455981], note: "Classic diner for breakfast, lunch or dinner." },
    { name: "M Italian", coords: [41.43236449618836, -81.39349924395754], note: "Good happy hour deal on pizza." },
    { name: "17 River Grill", coords: [41.43130172813415, -81.39284144578075], note: "Good place for a view of the Chagrin River and a nice meal." }
]

const dessert_shops = [
    {name: "Chagrin Falls Popcorn Shop", coords: [41.43112859368718, -81.39207715662624], note: "Good ice cream, great popcorn."},
    { name: "Jeni's Splendid Ice Creams", coords: [41.43144090573112, -81.39234782873788], note: "Great seasonal flavors." }
]

const historical_landmarks = [
    { name: "Chagrin Falls Waterfall", coords: [41.43129234563544, -81.39216620388052], note: "Includes stairs down to the river for a better view." },
    { name: "Chagrin Falls Intermediate School",  coords: [41.43088703920588, -81.38903207361484], note: "Over 100 years old." },
    { name: "Gazebo", coords: [41.43012536919485, -81.39151311681933], note: "Located in Triangle Park." }
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

const DINNER_COLOR    = '#a6531c';
const DESSERT_COLOR = '#1fbf78';
const LANDMARK_COLOR    = '#1f78bf'

// polylines
const north_main = [
    [41.42989359241167, -81.39111300791649],
    [41.431131946475375, -81.39187377737214],
    [41.43235026105354, -81.39263454491706],
    [41.43310598599101, -81.39309288785678],
    [41.43387419817461, -81.39356606342976]
];

const bell_st = [
    [41.43112573644155, -81.3918841705245],
    [41.43183439941561, -81.3898834929358],
    [41.43212967337158, -81.38876500389014],
    [41.43236188618222, -81.38587964785924]
]

const orange_st = [
    [41.43374540671943, -81.38876570472155],
    [41.43240210521664, -81.39264954316508],
    [41.4314690171538, -81.39525665018655],
    [41.431275962776645, -81.39669431414079]
]

// polygons
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

// 1. Make 3 layer groups for the points

const dinnerLayer = L.layerGroup(
    dinner_spots.map(f => L.marker(f.coords, { icon: svgIcon(DINNER_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const dessertLayer = L.layerGroup(
    dessert_shops.map(f => L.marker(f.coords, { icon: svgIcon(DESSERT_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

const historicalLandmarksLayer = L.layerGroup(
    historical_landmarks.map(f => L.marker(f.coords, { icon: svgIcon(LANDMARK_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`))
).addTo(map);

// 2. Create one layer group for all streets
const linesLayer = L.layerGroup([
    L.polyline(north_main, { color: '#a6531c', weight: 4 }),
    L.polyline(bell_st, { color: '#a6531c', weight: 4 }),
    L.polyline(orange_st, { color: '#a6531c', weight: 4 })
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
    { "Dinner Locations": dinnerLayer, "Dessert Shops": dessertLayer, "Historical Landmarks": historicalLandmarksLayer, 
        "Streets": linesLayer, "Buildings": buildingLayer }
).addTo(map);
