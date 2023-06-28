import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import ListProperty from '../../../Components/Home/ListProperty';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('ListProperty', () => {
    test('should render properties list', () => {
      const mockProperties = [
        {
          _id: '1',
          name: 'Propiedad 1',
          images: ['image-url-1'],
          description: 'Descripción de la propiedad 1',
          address: 'Dirección 1',
          city: 'Ciudad 1',
          surface: '100',
          operation: 'Operación 1',
        },
        {
          _id: '2',
          name: 'Propiedad 2',
          images: ['image-url-2'],
          description: 'Descripción de la propiedad 2',
          address: 'Dirección 2',
          city: 'Ciudad 2',
          surface: '200',
          operation: 'Operación 2',
        },
      ];
  
      render(<ListProperty propertiesList={mockProperties} />);
  
      const getPropertyByText = (text) =>
        screen.getByText((content, element) => {
          const hasText = (node) => node.textContent === text;
          const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
          return hasText(element) && childrenDontHaveText;
        });
  
      // Verificar que los elementos de la lista de propiedades se muestren correctamente
      expect(screen.getByText('Descripción de la propiedad 1')).toBeInTheDocument();
      expect(screen.getByText('Dirección: Dirección 1, Ciudad 1')).toBeInTheDocument();
      expect(screen.getByText('Tamaño: 100m²')).toBeInTheDocument();
      expect(getPropertyByText('Operación: Operación 1')).toBeInTheDocument();
  
      expect(screen.getByText('Descripción de la propiedad 2')).toBeInTheDocument();
      expect(screen.getByText('Dirección: Dirección 2, Ciudad 2')).toBeInTheDocument();
      expect(screen.getByText('Tamaño: 200m²')).toBeInTheDocument();
      expect(getPropertyByText('Operación: Operación 2')).toBeInTheDocument();
    });
  });