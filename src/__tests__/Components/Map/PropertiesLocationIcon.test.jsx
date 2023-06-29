import React from 'react';
import { render } from '@testing-library/react';
import PropertiesLocationIcon from '../../../Components/Map/PropertiesLocationIcon';
import L from 'leaflet';

// Mock de los íconos de ubicación
jest.mock('../../../assets/department_location_icon.svg', () => 'department_icon_url');
jest.mock('../../../assets/house_location_icon.svg', () => 'house_icon_url');
jest.mock('../../../assets/land_location_icon.svg', () => 'land_icon_url');


// Mock de la biblioteca Leaflet
jest.mock('leaflet', () => ({
  icon: jest.fn(() => 'leaflet_icon')
}));

describe('PropertiesLocationIcon', () => {
  it('renders an icon with the correct properties', () => {
    const { container } = render(<PropertiesLocationIcon type="Departamento" />);

    expect(L.icon).toHaveBeenCalledWith({
      iconUrl: 'land_icon_url',
      iconRetinaUrl: 'land_icon_url',
      iconAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: [35, 35],
      className: 'leaflet-venue-icon',
    });

    expect(container.innerHTML).toBe('leaflet_icon');
  });
});