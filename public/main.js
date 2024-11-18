"use strict";

import { VALUES, bound_value, in_to_ft } from "./lib/utils.js";
import { simulate } from "./lib/simulate.js";

const DOMFormInputs = document.querySelector(".js-form-inputs");

const DOMInputDrawWeight = document.querySelector(".js-input-draw-weight");
const DOMInputHeight = document.querySelector(".js-input-height");
const DOMInputHeightText = document.querySelector(".js-input-height-text");
const DOMInputVerticalAngle = document.querySelector(".js-input-vertical-angle");

const DOMButtonFire = document.querySelector(".js-button-fire");
const DOMButtonReset = document.querySelector(".js-button-reset");

const reset_inputs = () => {
  DOMInputDrawWeight.value = localStorage.oas_draw_weight;
  DOMInputHeight.value = localStorage.oas_height;
  DOMInputHeightText.textContent = in_to_ft(localStorage.oas_height);
  DOMInputVerticalAngle.value = 0;
};

const disable_inputs = (bool = true) => {
  const DOMList = [DOMInputDrawWeight, DOMInputHeight, DOMInputVerticalAngle, DOMButtonFire, DOMButtonReset];

  for (const DOMItem of DOMList) {
    DOMItem.disabled = bool;
  }
};

localStorage.oas_draw_weight = localStorage.oas_draw_weight || VALUES.WEIGHT.DEFAULT;
localStorage.oas_height = localStorage.oas_height || VALUES.HEIGHT.DEFAULT;

reset_inputs();

DOMInputDrawWeight.addEventListener("change", ({ target: input }) => {
  input.value = bound_value("WEIGHT", input.value);
  localStorage.oas_draw_weight = input.value;
});

DOMInputHeight.addEventListener("change", ({ target: input }) => {
  input.value = bound_value("HEIGHT", input.value);
  localStorage.oas_height = input.value;

  DOMInputHeightText.textContent = in_to_ft(input.value);
});

DOMInputVerticalAngle.addEventListener("change", ({ target: input }) => {
  input.value = bound_value("VERTICAL_ANGLE", input.value);
});

DOMButtonFire.addEventListener("click", (event) => {
  event.preventDefault();

  const form = new FormData(DOMFormInputs);
  const simulation = simulate(form);

  disable_inputs();

  console.log([...simulation()]);

  setTimeout(() => { disable_inputs(false); }, 3000);
});

DOMButtonReset.addEventListener("click", (event) => {
  event.preventDefault();

  reset_inputs();
});
