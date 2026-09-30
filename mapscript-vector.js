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

quick_eats.forEach(f => L.marker(f.coords).addTo(map));
convenience_stores.forEach(f => L.marker(f.coords).addTo(map));
landmarks.forEach(f => L.marker(f.coords).addTo(map));
