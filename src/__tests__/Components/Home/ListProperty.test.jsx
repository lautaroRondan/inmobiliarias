import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListProperty from '../../../Components/Home/ListProperty';
import { MemoryRouter, Link } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock de useNavigate
}));

describe('ListProperty', () => {
  const propertiesList = [
    {
      _id: '1',
      images: ['image1.jpg'],
      name: 'Property 1',
      description: 'Description 1',
      address: 'Address 1',
      city: 'City 1',
      surface: 100,
      operation: 'Sale',
    },
    {
      _id: '2',
      images: ['image2.jpg'],
      name: 'Property 2',
      description: 'Description 2',
      address: 'Address 2',
      city: 'City 2',
      surface: 200,
      operation: 'Rent',
    },
  ];

  test('renders list of properties', () => {
    render(
      <MemoryRouter>
        <ListProperty propertiesList={propertiesList} />
      </MemoryRouter>
    );

    // Check if property items are rendered
    const propertyItems = screen.getAllByRole('button');
    expect(propertyItems.length).toBe(propertiesList.length);

    // Check if property details are rendered correctly
    propertiesList.forEach((property, index) => {
      const propertyItem = propertyItems[index];

      // Check if image is rendered with the correct src and alt attributes
      const image = propertyItem.querySelector('img');
      expect(image).toBeInTheDocument();
      expect(image.src).toEqual(expect.stringContaining(property.images[0]));
      expect(image.alt).toBe(property.name);

      // Check if description, address, surface, and operation are rendered correctly
      expect(propertyItem).toHaveTextContent(property.description);
      expect(propertyItem).toHaveTextContent(`Dirección: ${property.address}, ${property.city}`);
      expect(propertyItem).toHaveTextContent(`Tamaño: ${property.surface}m²`);
      expect(propertyItem).toHaveTextContent(`Operacion: ${property.operation}`);
    });
  });

  test('renders "No hay propiedades" when propertiesList is empty', () => {
    render(
      <MemoryRouter>
        <ListProperty propertiesList={[]} />
      </MemoryRouter>
    );
  
    const noPropertiesMessage = screen.getByText('No hay propiedades');
    expect(noPropertiesMessage).toBeInTheDocument();
  });

  test('calls viewProperty when a property item is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ListProperty propertiesList={propertiesList} />
      </MemoryRouter>
    );

    const propertyItems = screen.getAllByRole('button');
    const propertyItem = propertyItems[0]; // Selecciona el primer elemento de la lista
    fireEvent.click(propertyItem);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/property/1');
  });
});