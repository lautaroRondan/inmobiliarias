import React from "react";
import { render, screen } from "@testing-library/react";
import PropiertiesMarkers from "../../../Components/Map/PropertiesMarkers";

test("renders markers for each data property", () => {
  // Datos de ejemplo para las propiedades
  const dataProperties = [
    {
        images: ['imagen1.jpg', 'imagen2.jpg'],
        description: 'Descripción de ejemplo',
        price: 100000,
        surface: '100 metros cuadrados',
        address: 'Dirección de ejemplo',
        inmobiliaria: 'Inmobiliaria de ejemplo',
        operation: 'Operación de ejemplo',
        coordinates: [-33.43334002269013, -70.59227331810038]
      }  ];

  // Renderiza el componente
  render(<PropiertiesMarkers dataProperties={dataProperties} />);

  // Verifica que se renderice un marcador por cada propiedad de datos
  const markers = screen.getAllByTestId("marker");

  expect(markers.length).toBe(dataProperties.length);
});
