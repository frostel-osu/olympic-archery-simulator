"use strict";

import { VALUES, bound_value, in_to_ft } from "./lib/utils.js";
import { simulate } from "./lib/simulate.js";
import { reset_chart, visualize } from "./lib/visualize.js";

const DOMFormInputs = document.querySelector(".js-form-inputs");

const DOMInputDrawWeight = document.querySelector(".js-input-draw-weight");
const DOMInputHeight = document.querySelector(".js-input-height");
const DOMInputHeightText = document.querySelector(".js-input-height-text");
const DOMInputVerticalAngle = document.querySelector(".js-input-vertical-angle");

const DOMButtonFire = document.querySelector(".js-button-fire");
const DOMButtonReset = document.querySelector(".js-button-reset");

const DOMVisualization = document.querySelector(".js-visualization");

const reset_inputs = () => {
  DOMInputDrawWeight.value = localStorage.oas_draw_weight;
  DOMInputHeight.value = localStorage.oas_height;
  DOMInputHeightText.textContent = in_to_ft(localStorage.oas_height);
  DOMInputVerticalAngle.value = 0;
};

const disable_inputs = (bool = true) => {
  const DOMList = [DOMInputDrawWeight, DOMInputHeight, DOMInputVerticalAngle, DOMButtonFire];

  for (const DOMItem of DOMList) {
    DOMItem.disabled = bool;
  }
};

localStorage.oas_draw_weight = localStorage.oas_draw_weight || VALUES.WEIGHT.DEFAULT;
localStorage.oas_height = localStorage.oas_height || VALUES.HEIGHT.DEFAULT;

reset_chart(DOMVisualization);
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

DOMButtonFire.addEventListener("click", async (event) => {
  event.preventDefault();

  const form = new FormData(DOMFormInputs);
  const simulation = simulate(form);

  disable_inputs();

  await visualize(DOMVisualization, simulation());

  DOMButtonReset.disabled = false;
});

DOMButtonReset.addEventListener("click", (event) => {
  event.preventDefault();

  reset_chart(DOMVisualization);
  reset_inputs();
  disable_inputs(false);

  DOMButtonReset.disabled = true;
});
