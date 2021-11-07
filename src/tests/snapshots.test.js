/**
 * @jest-environment jsdom
 */
 import React from 'react'
 import '@testing-library/jest-dom/extend-expect'
 import { fireEvent, render } from '@testing-library/react'
 import fs from 'fs'
import DashboardPage from '../pages/DashboardPage'
import MetricCard from '../components/MetricCard'
 
 /**
  * Read sample data for testing
  * 
  * @param {String} fileName JSON data filename
  * @returns {Array} an array of like records
  */
 describe("Snapshot Tests", () => {
 

   test('DashboardPage content', () => {
    const fuelType = "E10" 
    const setFuelType = "95" 
    const metrics = 110.1

    const component = render(
      <DashboardPage fuelType={fuelType} setFuelType={setFuelType} metrics={metrics}/>
    )

    // look for some content
    expect(component).toMatchSnapshot()
  })

  test('MetricCard content', () => {
    const title = "Title" 
    const figure = 120.5 
    const prevFigure = 110.1

    const component = render(
      <MetricCard title={title} figure={figure} prevFigure={prevFigure}/>
    )

    // look for some content
    expect(component).toMatchSnapshot()
  })



 })
 