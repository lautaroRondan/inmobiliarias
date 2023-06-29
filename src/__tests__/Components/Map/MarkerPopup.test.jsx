import React from "react";
import { render, screen } from "@testing-library/react";
import MarkerPopup from "../../../Components/Map/MarkerPopup";

test("renders MarkerPopup component", () => {
  const data = {
    name: "Property Name",
    description: "Property Description",
    address: "Property Address",
    surface: "100",
    city: "Property City",
  };

  render(<MarkerPopup data={data} />);

  // Verificar que los elementos de texto se rendericen correctamente
  const titleElement = screen.getByText("Property Name");
  const descriptionElement = screen.getByText("Property Description");
  const addressElement = screen.getByText("Property Address");
  const surfaceElement = screen.getByText("100 m²");
  const cityElement = screen.getByText("Property City");

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(addressElement).toBeInTheDocument();
  expect(surfaceElement).toBeInTheDocument();
  expect(cityElement).toBeInTheDocument();
});