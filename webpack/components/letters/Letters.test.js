"use strict";

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event";

import { MainDialog } from './Letters'
import * as hlp from './helpers.js'
import { Profiler } from './profiler.js'

it("Checks if object is empty ", () => {
  expect(hlp.isEmpty({})).toBe(true);
});
it("Gets alphabet as array with hash sign", () => {
  expect(Array.isArray(hlp.abc)).toBe(true);
  expect(hlp.abc.length).toEqual(27);
  expect(hlp.abc[26]).toBe("#");
});

it("Properly counts characters in text", () => {
  const results = new Profiler("aabc Adefg! 123! 4_567 89 !@#$%^&*()+=-").data;

  expect(results.firstLetters.max).toEqual(3);
  expect(results.firstLetters.A).toEqual(2);
  expect(results.firstLetters["#"]).toEqual(3);

  expect(results.allLetters.max).toEqual(10);
  expect(results.allLetters.A).toEqual(3);
  expect(results.allLetters["#"]).toEqual(10);
});

// UI
it("Renders main component", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MainDialog />, div);
});
it("Renders tabs names with active Chart", () => {
  const { getByText } = render(<MainDialog />);
  expect(document.querySelector("#tab-bar")).toHaveTextContent(/(Words)(Chart)/);
  expect(getByText("Chart")).toHaveClass("active");
});

it("Properly renders provided text", () => {
  // render main component
  const { getByText, getByRole } = render(<MainDialog />);
  // open Words tab
  userEvent.click(getByText("Words"));
  expect(getByText("Words")).toHaveClass("active");
  // type text into textarea
  userEvent.type(getByRole("textbox"), "aa ab 1");
  // press Render
  userEvent.click(getByText("Render"));
  // see Chart tab active
  expect(getByText("Chart")).toHaveClass("active");
  // check chart to be properly rendered
  expect(document.querySelector(".hist-bar:nth-of-type(1)>.all-letters").title).toEqual("3");
  expect(document.querySelector(".hist-bar:nth-of-type(1)>.first-letters").title).toEqual("2");
  expect(document.querySelector(".hist-bar:nth-of-type(27)>.all-letters").title).toEqual("1");
  expect(document.querySelector(".hist-bar:nth-of-type(27)>.first-letters").title).toEqual("1");
  expect(document.querySelector(".hist-bar:nth-of-type(27)>.first-letters").style.height).toEqual("50%");
});
