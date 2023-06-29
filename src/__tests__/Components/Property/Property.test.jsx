import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Property from '../../../Components/Property/Property';
import useFetch from '../../../Components/Hooks/useFetch';

jest.mock('../../../Components/Hooks/useFetch');
jest.mock('../../../assets/imagen-no-disponible.jpg', () => 'imagen-de-prueba');

describe('Property', () => {
  test('should render property details', async () => {
    const mockSendRequest = jest.fn();
    mockSendRequest.mockResolvedValueOnce({
      datos: {
        status: 'success',
        property: {
          images: ['imagen1.jpg', 'imagen2.jpg'],
          description: 'Descripción de ejemplo',
          price: 100000,
          surface: '100 metros cuadrados',
          address: 'Dirección de ejemplo',
          inmobiliaria: 'Inmobiliaria de ejemplo',
          operation: 'Operación de ejemplo',
          coordinates: [-33.43334002269013, -70.59227331810038]
        },
      },
    });
    useFetch.mockReturnValue({
      sendRequest: mockSendRequest,
    });

    render(
      <MemoryRouter initialEntries={['/property/123']}>
        <Routes>
          <Route path="/property/:id" element={<Property />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockSendRequest).toHaveBeenCalledWith('property/123', 'GET');

    // Espera a que se carguen los detalles de la propiedad
    await screen.findByText('Descripción de ejemplo');

    expect(screen.getByText('Descripción de ejemplo')).toBeInTheDocument();
    expect(screen.getByText('100000')).toBeInTheDocument();
    expect(screen.getByText('100 metros cuadrados')).toBeInTheDocument();
    expect(screen.getByText('Dirección de ejemplo')).toBeInTheDocument();
    expect(screen.getByText('Inmobiliaria de ejemplo')).toBeInTheDocument();
    expect(screen.getByText('Operación de ejemplo')).toBeInTheDocument();

    // Carrusel con imágenes
    const carouselImages = screen.getAllByRole('img');
    expect(carouselImages.length).toBe(7);
    expect(carouselImages[0].src).toContain('imagen1.jpg');
    expect(carouselImages[1].src).toContain('imagen2.jpg');
  });
});