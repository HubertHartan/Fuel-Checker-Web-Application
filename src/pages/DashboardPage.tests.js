/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import DashboardPage from './DashboardPage'

test('snapshot test', () => {
  const component = render(
    <DashboardPage fuelType={fuelType} metrics={metrics} stations={stations}/>
  )
    
  expect(component).toMatchSnapshot()
})