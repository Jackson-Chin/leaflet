const map = L.map('map', { 
    center: [40, -83], 
    zoom: 13
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
