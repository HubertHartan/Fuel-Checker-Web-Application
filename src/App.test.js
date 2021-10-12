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
  test('get request returns JSON', async () => {
    await api.get('/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
  })
});