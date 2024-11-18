"use strict";

const DOMFormInputs = document.querySelector(".js-form-inputs");

const DOMInputDrawWeight = document.querySelector(".js-input-draw-weight");
const DOMInputHeight = document.querySelector(".js-input-height");
const DOMInputHeightText = document.querySelector(".js-input-height-text");
const DOMInputVerticalAngle = document.querySelector(".js-input-vertical-angle");

const DOMButtonFire = document.querySelector(".js-button-fire");
const DOMButtonReset = document.querySelector(".js-button-reset");

const VALUES = {
  WEIGHT: {
    DEFAULT: 15,
    MIN: 15,
    MAX: 60
  },
  HEIGHT: {
    DEFAULT: 64,
    MIN: 48,
    MAX: 84
  },
  VERTICAL_ANGLE: {
    DEFAULT: 0,
    MIN: -90,
    MAX: 90
  }
}

const in_to_ft = (n, m = n % 12) => `${(n - m) / 12}'${m ? `${m}"` : ""}`;

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

const bound_input = (KEY, input) => {
  const { MIN, MAX } = VALUES[KEY];

  if (input < MIN) {
    return MIN;
  } else if (MAX < input) {
    return MAX;
  } else {
    return input;
  }
};

localStorage.oas_draw_weight = localStorage.oas_draw_weight || VALUES.WEIGHT.DEFAULT;
localStorage.oas_height = localStorage.oas_height || VALUES.HEIGHT.DEFAULT;

reset_inputs();

DOMInputDrawWeight.addEventListener("change", ({ target: input }) => {
  input.value = bound_input("WEIGHT", input.value);
  localStorage.oas_draw_weight = input.value;
});

DOMInputHeight.addEventListener("change", ({ target: input }) => {
  input.value = bound_input("HEIGHT", input.value);
  localStorage.oas_height = input.value;

  DOMInputHeightText.textContent = in_to_ft(input.value);
});

DOMInputVerticalAngle.addEventListener("change", ({ target: input }) => {
  input.value = bound_input("VERTICAL_ANGLE", input.value);
});

DOMButtonFire.addEventListener("click", (event) => {
  event.preventDefault();

  disable_inputs();

  setTimeout(() => { disable_inputs(false); }, 3000);
});

DOMButtonReset.addEventListener("click", (event) => {
  event.preventDefault();

  reset_inputs();
});
