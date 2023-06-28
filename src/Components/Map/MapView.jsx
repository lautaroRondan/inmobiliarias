import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./PropertiesMarkers";

import "leaflet/dist/leaflet.css";

const MapView = ({ defaultLocation, locations }) => {

  // Verificamos si `locations` es un array, de lo contrario lo convertimos en un array
  const dataProperties = Array.isArray(locations) ? locations : [locations];

  return (
    <MapContainer center={defaultLocation.currentLocation} zoom={defaultLocation.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Verificamos si hay elementos en `dataProperties`, y dependiendo si hay elementos se mostraran los marcadores */}
      {dataProperties.length > 0 && <Markers dataProperties={dataProperties} />
      }
    </MapContainer>
  );
};

export default MapView;
