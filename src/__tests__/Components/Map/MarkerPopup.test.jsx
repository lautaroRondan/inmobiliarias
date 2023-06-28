// import React from "react";
// import { render } from "@testing-library/react";
// import MarkerPopup from "../../../Components/Map/MarkerPopup";

// describe("MarkerPopup", () => {
//     it("renders marker popup with correct data", () => {
//       const data = {
//         name: "Example Name",
//         description: "Example Description",
//         address: "Example Address",
//         surface: "100",
//         city: "Example City",
//       };
  
//       const { getByText } = render(<MarkerPopup data={data} />);
  
//       expect(getByText(data.name)).toBeInTheDocument();
//       expect(getByText(data.description)).toBeInTheDocument();
//       expect(getByText(`Dirección: ${data.address}, ${data.city}`)).toBeInTheDocument();
//       expect(getByText(`Superficie: ${data.surface} m²`)).toBeInTheDocument();
//     });
//   });