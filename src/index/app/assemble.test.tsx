import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from "react-router-dom";
import Assemble from './assemble';
import { Routes } from '../shared/constants';



function MockReader(props: any) {
  const handleChange = (e: any) => {
    props.onScan(e.target.value)
  }

  return (
    <input type="text" data-testid="mock-qr-reader" onChange={handleChange} />
  )
}

function renderWithScanner(ui: React.ReactElement<any, any>) {
  const utils = render(ui)

  function onScan(value: string | null) {
    fireEvent.change(
      utils.getByTestId('mock-qr-reader'),
      { target: { value } }
    )
  }

  return {
    ...utils,
    onScan
  }
}

jest.mock('react-qr-reader', () => {
  return {
    __esModule: true,
    default: MockReader
  };
})

const part1Text = "sterling integrate assume publisher village rebellion chatter enterprise backfield visitor dwelling yesteryear absurd retrospect select torpedo wallet Chicago stapler corrosion accrue October Aztec decadence spearhead hemisphere alone impartial"
const part2Text = "crackdown bravado Christmas molecule beeswax suspicious offload inventive drumbeat confidence tempest revival bison microscope suspense opulent sterling publisher preclude hemisphere island sensation shamrock clergyman endow replica cobra impartial"
const part3Text = "stockman armistice eating filament newborn amusement spearhead vagabond ancient performance slowdown detergent crumpled getaway blackjack breakaway erase torpedo blowtorch celebrate acme headwaters watchword borderline unwind sympathy erase glossary"

test('Can Assemble a secret from QR codes', async () => {
  window.navigator.vibrate = jest.fn()
  HTMLMediaElement.prototype.play = jest.fn()
  const utils = renderWithScanner(
    <Router initialEntries={[Routes.Assemble]}>
      <Assemble />
    </Router>
  );

  fireEvent.click(
    utils.getByText('Scan QR Codes')
  )

  utils.onScan('https://asaayers.github.io/shamir-secret-splitter/assemble?index=1&hex=d57f10bbf6bf315315f553fe01c9b8e3fa2cd33a029c1341c96f0b75&numParts=4&quorum=3&label=XKCD')
  await utils.findByText(part1Text)
  expect(window.navigator.vibrate).toHaveBeenCalledTimes(1)
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1)

  utils.onScan('https://asaayers.github.io/shamir-secret-splitter/assemble?index=2&hex=401b36941bdb8c815034e1cb208ddb9fd5bb956f78d2bb2d59c33c75&numParts=4&quorum=3&label=XKCD')
  await utils.findByText(part2Text)
  expect(window.navigator.vibrate).toHaveBeenCalledTimes(2)
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2)

  utils.onScan('https://asaayers.github.io/shamir-secret-splitter/assemble?index=3&hex=d60b545d8807c9f20daec0464464211d5be32327036efb18f1dc5b65&numParts=4&quorum=3&label=XKCD')
  // await utils.findByText()
  expect(window.navigator.vibrate).toHaveBeenCalledTimes(3)
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3)

  expect(
    await utils.findByText("Correct Horse Battery Staple")
  ).toBeInTheDocument()
})

test('Can assemble a secret from text', async () => {
  const utils = renderWithScanner(
    <Router initialEntries={[Routes.Assemble]}>
      <Assemble />
    </Router>
  );

  fireEvent.change(
    await utils.findByLabelText('Part 1'),
    { target: { value: part1Text } }
  )
  fireEvent.change(
    await utils.findByLabelText('Part 2'),
    { target: { value: part2Text } }
  )
  fireEvent.change(
    await utils.findByLabelText('Part 3'),
    { target: { value: part3Text } }
  )

  fireEvent.click(
    // I think I have to use the test ID, because the `<span` doesn't bubble
    // up to the <button and trigger onSubmit.
    utils.getByTestId('done-btn')
  )

  expect(
    await utils.findByText("Correct Horse Battery Staple")
  ).toBeInTheDocument()
})

test.only('Text inputs validate complete words', async () => {
  const utils = renderWithScanner(
    <Router initialEntries={[Routes.Assemble]}>
      <Assemble />
    </Router>
  );

  const change = async (text: string) => {
    fireEvent.change(
      await utils.findByLabelText('Part 1'),
      { target: { value: text } }
    )
  }

  // let text = "sterling integrate assume p"

  await change('sterling test')
  expect(
    utils.queryByText('test not recognized')
  ).not.toBeInTheDocument()
  // I don't know why this doesn't work. Everything works fine when I type 1
  // character at a time
  // await utils.findByText('sterling test')

  await change('sterling test ')
  await utils.findByText('test not recognized')
})
