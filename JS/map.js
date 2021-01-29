var mymap;
var marker;
var layer;

/**
 * Inicializamos el mapa con las coordenadas del CIFP Cesar Manrique
 */
export function startMap() {
  mymap = L.map("mapid").setView([28.45573, -16.28282], 16);

  layer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Datos Mapa &copy; <a href="https://www.openstreetmap.org/?mlat=28.45573&mlon=-16.28282#map=17/28.45573/-16.28282&layers=N">OpenStreetMap</a> contribuidores, Imágenes © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }).addTo(mymap);

  marker = L.marker([28.45573, -16.28282], 17).addTo(mymap);
  marker.bindPopup("CIFP Cesar Manrique");
}

/**
 * Aplicamos al mapa su nueva ubicación actualizando parámetros como el marker y el layer
 * @param {*} firstCoord primer parámetro de coordenada
 * @param {*} secondCoord segundo parámetro de coordenada
 * @param {*} city nombre de la ciudad a la que apuntará el mapa
 */
export function flyTo(firstCoord, secondCoord, city) {
  // Fly to a random location by offsetting the point -74.50, 40
  // by up to 5 degrees.
  mymap = mymap.flyTo([firstCoord, secondCoord], 13);

  marker.bindPopup(city);
  mymap.removeLayer(layer);
  layer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Datos Mapa &copy; <a href="https://www.openstreetmap.org/?mlat=' +
      firstCoord +
      "&mlon=" +
      secondCoord +
      "#map=17/ " +
      firstCoord +
      "/" +
      secondCoord +
      '&layers=N">OpenStreetMap</a> contribuidores, Imágenes © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }).addTo(mymap);
  marker.setLatLng([firstCoord, secondCoord]);
}
