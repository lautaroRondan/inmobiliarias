import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Home from '../../../Components/Home/Home';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../Components/Hooks/useFetch', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    sendRequest: jest.fn(),
  }),
}));

describe('Home component', () => {
  test('renders Home component', async () => {
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

    // Simular la función sendRequest
    const useFetchMock = jest.requireMock("../../../Components/Hooks/useFetch").default;
    useFetchMock.mockReturnValue({
      sendRequest: jest.fn().mockResolvedValue({
        datos: mockData,
        cargando: false,
      }),
    });

    // Renderizar el componente
    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    // Esperar a que se realice la petición de propiedades
    await waitFor(() => {
      expect(sendRequest).toHaveBeenCalledWith('list-property', 'GET');
    });

    // Verificar que se rendericen las propiedades
    expect(screen.getByText('Property 1')).toBeInTheDocument();
    expect(screen.getByText('Property 2')).toBeInTheDocument();
  });
});