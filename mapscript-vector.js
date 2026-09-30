const map = L.map('map', { 
    center: [40.0007, -83.008], // -- NEW
    zoom: 17                    // -- NEW
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

L.control.layers({ 
    "Streets": streets, 
    "Topographic": topo, 
    "Satellite": satellite,
    "OpenStreetMap": osm
}).addTo(map);

// Add the following
const quick_eats = [
    { name: "Qdoba Mexican Eats",  coords: [40.002265770114704, -83.00831544391653] },
    { name: "Red Chili",           coords: [40.0020812252386, -83.00827194929629] },
    { name: "Smashburger",         coords: [39.999824185055225, -83.007835944253] },
    { name: "Dave's Hot Chicken",  coords: [39.99964518131456, -83.00783907331429] }
]

const convenience_stores = [
    {name: "Target",               coords: [40.00094825710499, -83.00802044889093]}
]

// These may or may not be "landmarks", but a square and a garage are hard to miss 
const landmarks = [
    { name: "University Square",   coords: [40.00018911567196, -83.00766099251994] },
    { name: "Union Garage North",  coords: [39.99895193757101, -83.00846543279417] }
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

quick_eats.forEach(f => L.marker(f.coords, { icon: svgIcon(QEATS_COLOR) }).addTo(map));
convenience_stores.forEach(f => L.marker(f.coords, { icon: svgIcon(STORE_COLOR) }).addTo(map));
landmarks.forEach(f => L.marker(f.coords, { icon: svgIcon(LANDMARK_COLOR) }).addTo(map));
