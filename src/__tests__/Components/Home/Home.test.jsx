import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../../Components/Home/Home";

jest.mock("../../../Components/Hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../assets/department_location_icon.svg", () =>
  require("../../../../__mocks__/fileMock.js")
);
jest.mock("../../../assets/house_location_icon.svg", () =>
  require("../../../../__mocks__/mockSvgFile")
);
jest.mock("../../../assets/land_location_icon.svg", () =>
  require("../../../../__mocks__/mockSvgFile")
);

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render data", async () => {
    const mockData = {
      status: "success",
      message: "Propiedades obtenidas exitosamente",
      properties: [
        {
          images: [],
          _id: "6497ad214fe3188d532300cc",
          name: "Monoambiente",
          description: "Monoambiente amoblado",
          address: "Javiar muñiz 79",
          operation: "Alquiler",
          coordinates: [-34.5872576, -60.9522095],
          kindOfProperty: "Departamento",
          price: "55.0000",
          city: "Junín",
          surface: "50",
          country: "Argentina",
          inmobiliaria: "Triple A",
          __v: 0,
        },
      ],
    };

    jest.spyOn(React, "useEffect").mockImplementation((effect) => effect());
    jest.spyOn(React, "useRef").mockReturnValue({ current: null });

    const useFetchMock = jest.requireMock("../../../Components/Hooks/useFetch").default;
    useFetchMock.mockReturnValue({
      sendRequest: jest.fn().mockResolvedValue({
        datos: mockData,
        cargando: false,
      }),
    });

    render(<Home />);

    const dataElement = await screen.findByText("Propiedades obtenidas exitosamente");

    expect(dataElement).toBeInTheDocument();
  });

  test("should render loading state", async () => {
    jest.spyOn(React, "useEffect").mockImplementation((effect) => effect());
    jest.spyOn(React, "useRef").mockReturnValue({ current: null });

    const useFetchMock = jest.requireMock("../../../Components/Hooks/useFetch").default;
    useFetchMock.mockReturnValue({
      sendRequest: jest.fn().mockResolvedValue({
        datos: null,
        cargando: true,
      }),
    });

    render(<Home />);

    const loadingElement = await screen.findByText("Loading...");

    expect(loadingElement).toBeInTheDocument();
  });

  test("should render error message", async () => {
    jest.spyOn(React, "useEffect").mockImplementation((effect) => effect());
    jest.spyOn(React, "useRef").mockReturnValue({ current: null });

    const useFetchMock = jest.requireMock("../../../Components/Hooks/useFetch").default;
    useFetchMock.mockReturnValue({
      sendRequest: jest.fn().mockRejectedValue(new Error("Request failed")),
    });

    render(<Home />);

    const errorElement = await screen.findByText("Error: Request failed");

    expect(errorElement).toBeInTheDocument();
  });
});
