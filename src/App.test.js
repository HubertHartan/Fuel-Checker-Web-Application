/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer"; 
import { render, screen } from '@testing-library/react';
import App from './App';
import Dashboard from "./components/Dashboard"


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('snapshot test', () => {
  const component = render(
    <Dashboard fuelType={fuelType} metrics={metrics} stations={stations}/>
  )
  
  expect(component).toMatchSnapshot()
})
