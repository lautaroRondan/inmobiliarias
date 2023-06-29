import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Pagination from '../../../Components/Home/Pagination';

describe('Pagination', () => {
  test('should render pagination buttons', () => {
    const currentPage = 1;
    const totalPages = 5;
    const onPageChange = jest.fn();

    render(
      <MemoryRouter>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </MemoryRouter>
    );

    // Obtener todos los botones de paginación
    const paginationButtons = screen.getAllByRole('button');

    // Verificar que los botones tengan el texto correcto
    paginationButtons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());

      // Verificar que el botón de la página actual tenga la clase "active"
      if (index + 1 === currentPage) {
        expect(button).toHaveClass('active');
      } else {
        expect(button).not.toHaveClass('active');
      }
    });
  });

  test('should call onPageChange callback when a button is clicked', () => {
    const currentPage = 1;
    const totalPages = 5;
    const onPageChange = jest.fn();

    render(
      <MemoryRouter>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </MemoryRouter>
    );

    // Obtener todos los botones de paginación
    const paginationButtons = screen.getAllByRole('button');

    // Simular un click en un botón específico
    fireEvent.click(paginationButtons[2]);

    // Verificar que la función onPageChange se haya llamado una vez
    expect(onPageChange).toHaveBeenCalledTimes(1);

    // Verificar que la función onPageChange se haya llamado con el número de página correcto
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});