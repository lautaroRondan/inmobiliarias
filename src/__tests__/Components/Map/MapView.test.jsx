import React from "react";
import { render } from "@testing-library/react";
import L from "leaflet";
import MapView from "../../../Components/Map/MapView";

// Configuración de burla para archivos SVG
jest.mock("../../../assets/department_location_icon.svg", () => require("../../../../__mocks__/mockSvgFile"));
jest.mock("../../../assets/house_location_icon.svg", () => require("../../../../__mocks__/mockSvgFile"));
jest.mock("../../../assets/land_location_icon.svg", () => require("../../../../__mocks__/mockSvgFile"));


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

test("renders MapView component", () => {
  // Datos de ejemplo para las propiedades
  const defaultLocation = {
    currentLocation: [51.505, -0.09],
    zoom: 13
  };

  const locations = [
    { id: 1, name: "Location 1", coordinates: [51.505, -0.09] },
    { id: 2, name: "Location 2", coordinates: [51.51, -0.1] },
    { id: 3, name: "Location 3", coordinates: [51.49, -0.08] }
  ];

  // Renderiza el componente
  const { getByTestId } = render(
    <MapView defaultLocation={defaultLocation} locations={locations} />
  );

  // Verifica que el componente se haya renderizado correctamente
  const mapElement = getByTestId("map-view");

  expect(mapElement).toBeInTheDocument();
});