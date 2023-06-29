import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../../../Components/Footer/Footer';

test('renders the footer component', () => {
  const { container } = render(<Footer />);
  const footerElement = container.querySelector('.footer');
  expect(footerElement).toBeInTheDocument();
});

test('renders the copyright text', () => {
  const { getByText } = render(<Footer />);
  const copyrightElement = getByText(/Copyright 2022 Lautaro Rondan/i);
  expect(copyrightElement).toBeInTheDocument();
});
