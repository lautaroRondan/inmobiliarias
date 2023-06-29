import L from "leaflet";
import departmentIcon from "../../assets/department_location_icon.svg";
import houseIcon from "../../assets/house_location_icon.svg";
import landIcon from "../../assets/land_location_icon.svg";

// Función para obtener la URL del ícono según el tipo de propiedad
const getIconUrl = (type) => {
  // Determinar el icono según el tipo
  switch (type) {
    case "Departamento":
      return departmentIcon;
    case "Casa":
      return houseIcon;
    default:
      return landIcon;
  }
};

const PropertiesLocationIcon = ({ type }) => {
  // Obtener la URL del ícono según el tipo
  const iconUrl = getIconUrl(type);

  return L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconUrl,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
  });
};

export default PropertiesLocationIcon;