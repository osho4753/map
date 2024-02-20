let headElement = document.body
let h1 = document.createElement('h1')
h1.style.textAlign = 'center'
var map = L.map('map', {
  dragging: false,
  touchZoom: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  tap: false,
  keyboard: false,
  zoomControl: false,
  attributionControl: false,
  prefix: false,
}).setView([49.8175, 15.473], 7)
function onEachFeature(feature, layer) {
  layer.setStyle({
    weight: 2,
    color: 'blue',
    fillOpacity: 0.2,
  })

  layer.on('mouseover', function (e) {
    layer.setStyle({
      weight: 3,
      color: 'red',
      fillOpacity: 0.7,
    })
    h1.textContent = feature.properties.name
    headElement.appendChild(h1)
  })
  layer.on('mouseout', function (e) {
    layer.setStyle({
      weight: 2,
      color: 'blue',
      fillOpacity: 0.2,
    })
    h1.remove()
  })
}
fetch('./bounds/czech-republic-with-regions_.geojson')
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      onEachFeature: onEachFeature,
    }).addTo(map)
  })
