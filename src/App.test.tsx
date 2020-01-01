import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from "react-router-dom";
import App from './App';

test('Can navigate from home to new', () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );

  act(() => {
    const linkElement = getByText(/New/i);
    expect(linkElement).toBeInTheDocument();
    linkElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  })


  const secretLabel = getByText(/Secret Text/i);
  expect(secretLabel).toBeInTheDocument();
});

test('Can create a secret', async () => {
  const { getByLabelText, getByText, getAllByText } = render(
    <Router initialEntries={["/edit"]}>
      <App />
    </Router>
  );

  const label = `Asa's Secret`
  const secretText = `password: ${Math.random()}`
  const subset = 3
  const parts = 4


  await act(async () => {
    fireEvent.change(
      getByLabelText('Label'),
      { target: { value: label } }
    )



    fireEvent.change(
      getByLabelText('Secret Text'),
      { target: { value: secretText } }
    )


    fireEvent.change(
      getByLabelText('Subset'),
      { target: { value: subset } }
    )

    fireEvent.change(
      getByLabelText('Parts'),
      { target: { value: parts } }
    )

    // I need to wait for the change handlers to all re-render the component
    // before clicking done.
    await Promise.resolve()

    fireEvent.click(
      getByText('Done')
    )
  })


  await waitForElement(
    () => getAllByText(secretText, { exact: false })
  )

  expect(
    getAllByText(label, { exact: false })[0]
  ).toBeInTheDocument();
  expect(
    getAllByText(secretText, { exact: false })[0]
  ).toBeInTheDocument();
  expect(
    getAllByText(String(subset), { exact: false })[0]
  ).toBeInTheDocument();
  expect(
    getAllByText(String(parts), { exact: false })[0]
  ).toBeInTheDocument();
})
