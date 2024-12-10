"use strict";

import { VALUES, bound_value, in_to_ft } from "./lib/utils.js";

const DOMFormInputs = document.querySelector(".js-form-inputs");

const DOMInputDrawWeight = document.querySelector(".js-input-draw-weight");
const DOMInputHeight = document.querySelector(".js-input-height");
const DOMInputHeightText = document.querySelector(".js-input-height-text");
const DOMInputVerticalAngle = document.querySelector(".js-input-vertical-angle");

const DOMButtonFire = document.querySelector(".js-button-fire");
const DOMButtonReset = document.querySelector(".js-button-reset");

const DOMVisualization = document.querySelector(".js-visualization");

const rect = DOMVisualization.getBoundingClientRect();

const start_visualization = (draw_weight_lb, height_in, vertical_angle_deg) => {
  DOMVisualization.contentWindow.postMessage({
    type: "start",
    data: { draw_weight_lb, height_in, rect, vertical_angle_deg }
  }, "http://localhost:3003");
};

const reset_visualization = () => {
  DOMVisualization.contentWindow.postMessage({
    type: "reset",
    data: { rect }
  }, "http://localhost:3003");
};

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

DOMVisualization.addEventListener("load", () => {
  reset_visualization();
  reset_inputs();  
});

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

window.addEventListener("message", ({ data: { type } }) => {
  switch (type) {
    case "done":
      DOMButtonReset.disabled = false;
      break;
  }
});

DOMButtonFire.addEventListener("click", async (event) => {
  event.preventDefault();

  const form = new FormData(DOMFormInputs);

  disable_inputs();

  start_visualization(form.get("draw-weight"), form.get("height"), form.get("vertical-angle"));
});

DOMButtonReset.addEventListener("click", (event) => {
  event.preventDefault();

  reset_visualization();
  reset_inputs();
  disable_inputs(false);

  DOMButtonReset.disabled = true;
});
