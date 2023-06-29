import React from "react";
import { Marker } from "react-leaflet";
import PropertiesLocationIcon from "./PropertiesLocationIcon";
import MarkerPopup from "./MarkerPopup";

const PropiertiesMarkers = (props) => {
  const { dataProperties } = props;

  // Mapear cada venue y generar un marcador con su respectivo ícono y popup
  const Markers = dataProperties.map((dataProperty) => (
    <Marker key={dataProperty._id} position={dataProperty.coordinates} icon={PropertiesLocationIcon({ type: dataProperty.kindOfProperty })}>
      <MarkerPopup data={dataProperty} />
    </Marker>
  ));
  return <>{Markers}</>;
};

export default PropiertiesMarkers;