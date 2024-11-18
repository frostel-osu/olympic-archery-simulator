"use strict";

import { TIME_STEP, m_to_ft } from "./utils.js";

const reset_chart = (node) => {
  const { height, width } = node.getBoundingClientRect();

  const svg = d3.select(node);

  svg.selectAll("*").remove();

  const top = 16;
  const right = 16;
  const bottom = 48;
  const left = 64;

  const chart_height = height - top - bottom;
  const chart_width = width - left - right;

  const x_scale = d3.scaleLinear().range([0, chart_width]);
  const y_scale = d3.scaleLinear().range([chart_height, 0]);

  const x_axis = svg.append("g").attr("transform", `translate(${left}, ${chart_height + top})`);
  const y_axis = svg.append("g").attr("transform", `translate(${left}, ${top})`);

  x_axis.call(d3.axisBottom(x_scale));
  y_axis.call(d3.axisLeft(y_scale));

  const time = svg.append("text")
    .attr("x", width - right)
    .attr("y", top)
    .attr("class", "c-time")
    .text("0.00 s");

  svg.append("text")
    .attr("transform", `translate(${width / 2 + 16}, ${chart_height + top + 48})`)
    .attr("class", "c-axis")
    .text("Distance (ft)");

  svg.append("text")
    .attr("transform", `translate(${left - 48}, ${height / 2 - 16}) rotate(-90)`)
    .attr("class", "c-axis")
    .text("Height (ft)");

  return { x_axis, y_axis, x_scale, y_scale, time, top, left };
};

const visualize = (node, simulation) => {
  const { x_axis, y_axis, x_scale, y_scale, time, top, left } = reset_chart(node);

  const svg = d3.select(node);

  const path = svg.append("path").attr("class", "c-path");

  const line = d3.line()
    .x((d) => x_scale(d.x) + left)
    .y((d) => y_scale(d.y) + top);

  const trajectory = [];

  const ms = TIME_STEP * 1000;

  return new Promise((resolve) => (function step() {
    const next = simulation.next();

    if (next.done) {
      return resolve(trajectory);
    }

    trajectory.push(m_to_ft(next.value));

    x_scale.domain([0, d3.max(trajectory, (d) => d.x) * 1.1]);
    y_scale.domain([0, d3.max(trajectory, (d) => d.y) * 1.1]);

    x_axis.call(d3.axisBottom(x_scale));
    y_axis.call(d3.axisLeft(y_scale));

    path.datum(trajectory).attr("d", line);

    time.text(`${next.value.t.toFixed(2)} s`);

    setTimeout(step, ms);
  })());
};

export { reset_chart, visualize };
