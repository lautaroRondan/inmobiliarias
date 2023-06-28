// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Home from "../../../Components/Home/Home";
// import { useFetch } from "../../../Components/Hooks/useFetch";

// jest.mock("../../../assets/department_location_icon.svg", () =>
//   require("../../../../__mocks__/fileMock.js")
// );
// jest.mock("../../../assets/house_location_icon.svg", () =>
//   require("../../../../__mocks__/mockSvgFile")
// );
// jest.mock("../../../assets/land_location_icon.svg", () =>
//   require("../../../../__mocks__/mockSvgFile")
// );

// jest.mock("../../../Components/Hooks/useFetch");

// describe("Home", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should render data", async () => {
//     const mockData = {
//       status: "success",
//       message: "Propiedades obtenidas exitosamente",
//       properties: [
//         {
//           images: [],
//           _id: "6497ad214fe3188d532300cc",
//           name: "Monoambiente",
//           description: "Monoambiente amoblado",
//           address: "Javiar muñiz 79",
//           operation: "Alquiler",
//           coordinates: [-34.5872576, -60.9522095],
//           kindOfProperty: "Departamento",
//           price: "55.0000",
//           city: "Junín",
//           surface: "50",
//           country: "Argentina",
//           inmobiliaria: "Triple A",
//           __v: 0,
//         },
//       ],
//     };

//     useFetch.mockImplementation(() => ({
//       sendRequest: jest.fn().mockResolvedValue({
//         datos: mockData,
//         cargando: false,
//       }),
//     }));

//     render(<Home />);

//     const dataElement = await screen.findByText("Propiedades obtenidas exitosamente");

//     expect(dataElement).toBeInTheDocument();
//   });

//   test("should render loading state", async () => {
//     useFetch.mockImplementation(() => ({
//       sendRequest: jest.fn().mockResolvedValue({
//         datos: null,
//         cargando: true,
//       }),
//     }));

//     render(<Home />);

//     const loadingElement = await screen.findByText("Loading...");

//     expect(loadingElement).toBeInTheDocument();
//   });

//   test("should render error message", async () => {
//     useFetch.mockImplementation(() => ({
//       sendRequest: jest.fn().mockRejectedValue(new Error("Request failed")),
//     }));

//     render(<Home />);

//     const errorElement = await screen.findByText("Error: Request failed");

//     expect(errorElement).toBeInTheDocument();
//   });
// });
