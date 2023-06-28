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

    const paginationButtons = screen.getAllByRole('button');

    paginationButtons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());

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

    const paginationButtons = screen.getAllByRole('button');

    fireEvent.click(paginationButtons[2]);

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
