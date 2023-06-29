import React from "react";
import { render } from "@testing-library/react";
import PropertiesMarkers from "../../../Components/Map/PropertiesMarkers";
import PropertiesLocationIcon from "../../../Components/Map/PropertiesLocationIcon";

// Mock dataProperties
const dataProperties = [
  {
    _id: "1",
    coordinates: [12.345, 67.89],
    kindOfProperty: "house",
    name: "House 1",
    description: "Beautiful house",
    address: "123 Main St",
    surface: 200,
    city: "City A",
  },
  {
    _id: "2",
    coordinates: [98.765, 43.21],
    kindOfProperty: "apartment",
    name: "Apartment 1",
    description: "Spacious apartment",
    address: "456 Elm St",
    surface: 150,
    city: "City B",
  },
];

describe("PropertiesMarkers", () => {
  test("renders markers with correct data for each property", () => {
    const { container } = render(<PropertiesMarkers dataProperties={dataProperties} />);

    // Check if the correct number of markers are rendered
    expect(container.querySelectorAll(".marker").length).toBe(dataProperties.length);

    // Check if the data of each property is displayed correctly in the markers
    dataProperties.forEach((property) => {
      expect(container).toHaveTextContent(property._id);
      expect(container).toHaveTextContent(property.coordinates);
      // Add more assertions according to the data you want to verify

      // Check if the correct icon is used based on the kindOfProperty
      expect(container.querySelector(`[data-testid="icon-${property._id}"]`)).toHaveAttribute("src", PropertiesLocationIcon({ type: property.kindOfProperty }));
    });
  });
});
