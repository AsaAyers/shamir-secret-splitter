import React from 'react'
import { render } from '@testing-library/react';
import PartInput from './part-input'

test('PartInput updates the text when hex changes externally', () => {
  let part = {
    index: 1,
    hex: 'aa',
  }

  const { getByText, rerender } = render(
    <PartInput part={part} index={1} />
  );

  expect(
    getByText('reward'),
  ).toBeInTheDocument()

  part = {
    ...part,
    hex: 'bb',
  }

  rerender(
    <PartInput part={part} index={1} />
  );

  expect(
    getByText('shamrock'),
  ).toBeInTheDocument()

})
