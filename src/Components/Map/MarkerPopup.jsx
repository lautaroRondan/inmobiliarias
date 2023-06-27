import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = (props) => {
  const { name, description, address, surface, city } = props.data;
  return (
    <Popup>
      <div className="marker-popup">
        <h4 className="popup-title">{name}</h4>
        <p className="popup-description">{description}</p>
        <p className="popup-info">
          <span className="info-label">Dirección:</span> {address}, {city}
        </p>
        <p className="popup-info">
          <span className="info-label">Superficie:</span> {surface} m²
        </p>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
