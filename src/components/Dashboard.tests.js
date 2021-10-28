/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import Dashboard from './Dashboard'

test('snapshot test', () => {
  const component = render(
    <Dashboard fuelType={fuelType} metrics={metrics} stations={stations}/>
  )
    
  expect(component).toMatchSnapshot()
})