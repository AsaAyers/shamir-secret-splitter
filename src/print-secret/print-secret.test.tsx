import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { useLocation, useHistory, Link } from "react-router-dom";
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from "react-router-dom";
import App from '../App';
import { Routes } from '../constants'
import { Secret } from '../types';

function TestPathname() {
  const location = useLocation()

  return <div data-testid="pathname">{location.pathname}</div>
}

test('Redirects if location state is missing', async () => {
  const { getByTestId } = render(
    <Router initialEntries={[Routes.Print]}>
      <App />
      <TestPathname />
    </Router>
  );
  expect(getByTestId('pathname').textContent).toBe(Routes.Edit)
})

test('Recieves the secret through location state', () => {

  const secret: Secret = {
    label: "Test Secret",
    text: "Password: Correct Horse Battery Staple",
    numParts: 4,
    quorum: 3,
  }

  const { getByTestId, getAllByText } = render(
    <Router initialEntries={[{ pathname: Routes.Print, state: secret }]}>
      <App />
      <TestPathname />
    </Router>
  );
  expect(getByTestId('pathname').textContent).toBe(Routes.Print)

  expect(
    getAllByText(secret.label, { exact: false })[0]
  ).toBeInTheDocument();
  expect(
    getAllByText(secret.text, { exact: false })[0]
  ).toBeInTheDocument();
  expect(
    getAllByText(String(secret.quorum), { exact: false })[0]
  ).toBeInTheDocument();
  expect(
    getAllByText(String(secret.numParts), { exact: false })[0]
  ).toBeInTheDocument();
})
