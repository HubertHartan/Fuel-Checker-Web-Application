import { render, screen } from '@testing-library/react';
const mongoose = require('mongoose') 
const supertest = require('supertest')
const fs = require('fs')
const request = require("supertest");
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("GET / ", () => {
  test("Should get 200", async () => {
    const response = await request(App).get("/");
    expect(response.statusCode).toBe(200);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});