const map = L.map('map', { 
    center: [41.432064264540536, -81.39244569531358], // -- Chagrin Falls, OH (my hometown)
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
const hardware_store = [
    [41.43188603467466, -81.39218183214535],
    [41.43200267066672, -81.39184923824548],
    [41.43208113426989, -81.39190019187724],
    [41.43204984217933, -81.39199294122733],
    [41.43216110287722, -81.39206559488493],
    [41.432078816337764, -81.3923051973727]
];

// polygon with holes
// make sure the exterior is counterclockwise and all interiors are clockwise
const church = [
    // outer ring
    [
        [41.433565294342344, -81.38988656338422],
        [41.43373018917653, -81.38943863450297],
        [41.43383274550849, -81.38949764309811],
        [41.43385888729268, -81.38941717683201],
        [41.43405394488848, -81.38954860506664],
        [41.43386091813531, -81.39007697133299]
    ],
    // hole
    [
        [41.4338287236946, -81.3899241143084],
        [41.43391516714237, -81.38962369283956],
        [41.43382668729166, -81.38956468424443],
        [41.43376032732447, -81.38987045605559]
    ]
]

// multipolygon
const shopping_plaza = 
[
    // polygon 1
    [
        // first ring
        [
            [41.43110033227671, -81.39090878569745],
            [41.4313565279287, -81.39014386168587],
            [41.43157746648635, -81.3902598542614],
            [41.43130239023345, -81.39106921671561]
            
        ]
    ],
    // polygon 2
    [
        [
            [41.43173964079083, -81.3894385127276],
            [41.431563378917055, -81.38998395035267],
            [41.430972863472064, -81.38962123228474],
            [41.43116517007851, -81.3890927002429]
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
    L.polygon(hardware_store, polygon_style),
    L.polygon(church, polygon_style),
    L.polygon(shopping_plaza, polygon_style)
])

// 4. Create the control with all layers
L.control.layers(
    { "Streets": streets, "Topographic": topo, "Satellite": satellite, "OpenStreetMap": osm },
    { "Dinner Locations": dinnerLayer, "Dessert Shops": dessertLayer, "Historical Landmarks": historicalLandmarksLayer, 
        "Streets": linesLayer, "Buildings": buildingLayer }
).addTo(map);
