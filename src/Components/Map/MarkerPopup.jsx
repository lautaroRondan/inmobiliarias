import React from "react";
import { Popup } from "react-leaflet";
import "./Map.css"

const MarkerPopup = (props) => {
  const { name, description, address, surface, city, operation } = props.data;
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
        <p className="popup-info">
          <span className="info-label">Operacion:</span> {operation} 
        </p>
      </div>
    </Popup>
  );
};

export default MarkerPopup;