/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer"; 
import { render, screen } from '@testing-library/react';
import App from './App';
import Dashboard from "./components/Dashboard"
import Map from "./components/Map";
import MapContainer from "./components/MapContainer";
import MetricCard from "./components/MetricCard";


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Dashboard snapshot test', () => {
  const component = render(
    <Dashboard fuelType={fuelType} metrics={metrics} stations={stations}/>
  )
  
  expect(component).toMatchSnapshot()
})

test('Map snapshot test', () => {
  const component = render(
    <Map title={title} figure={figure}/>
  )
  
  expect(component).toMatchSnapshot()
})

test('MapContainer snapshot test', () => {
  const component = render(
    <MapContainer initialLocation={initialLocation}/>
  )
  
  expect(component).toMatchSnapshot()
})

test('MetricCard snapshot test', () => {
  const component = render(
    <MetricCard title={title} figure={figure}/>
  )
  
  expect(component).toMatchSnapshot()
})