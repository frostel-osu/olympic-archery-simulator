"use strict";

const TIME_STEP = 0.01; //seconds

const VALUES = {
  WEIGHT: {
    DEFAULT: 15,
    MAX: 60,
    MIN: 15
  },
  HEIGHT: {
    DEFAULT: 64,
    MAX: 84,
    MIN: 48
  },
  VERTICAL_ANGLE: {
    DEFAULT: 0,
    MAX: 90,
    MIN: -90
  }
};

const bound_value = (KEY, value) => {
  const { DEFAULT, MAX, MIN } = VALUES[KEY];

  if (value === "") {
    return DEFAULT;
  } else if (value < MIN) {
    return MIN;
  } else if (MAX < value) {
    return MAX;
  } else {
    return value;
  }
};

const m_to_ft = ({ x, y }) => ({
  x: x * 3.281,
  y: y * 3.281
});

const in_to_ft = (n, m = n % 12) => `${(n - m) / 12}'${m ? `${m}"` : ""}`;

export {
  TIME_STEP,
  VALUES,
  bound_value,
  m_to_ft,
  in_to_ft
};
