const data = [
  { month: "Jan", cats: 120, dogs: 150 },
  { month: "Feb", cats: 135, dogs: 165 },
  { month: "Mar", cats: 150, dogs: 178 },
  { month: "Apr", cats: 170, dogs: 190 },
  { month: "May", cats: 185, dogs: 205 },
  { month: "Jun", cats: 210, dogs: 220 },
  { month: "Jul", cats: 230, dogs: 240 },
  { month: "Aug", cats: 250, dogs: 255 },
  { month: "Sep", cats: 265, dogs: 275 },
  { month: "Oct", cats: 285, dogs: 295 },
  { month: "Nov", cats: 305, dogs: 315 },
  { month: "Dec", cats: 325, dogs: 340 }
];

const svg = d3.select("#lineChart");
const width = +svg.attr("width");
const height = +svg.attr("height");

const margin = { top: 50, right: 80, bottom: 60, left: 60 };

const tooltip = d3.select("#tooltip");

const x = d3.scalePoint()
  .domain(data.map(d => d.month))
  .range([margin.left, width - margin.right])
  .padding(0.5);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => Math.max(d.cats, d.dogs)) + 30])
  .range([height - margin.bottom, margin.top]);

// X Axis
svg.append("g")
  .attr("transform", `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("font-size", "13px");

// Y Axis
svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y))
  .selectAll("text")
  .style("font-size", "13px");

// Axis labels
svg.append("text")
  .attr("class", "axis-label")
  .attr("x", width / 2)
  .attr("y", height - 20)
  .attr("text-anchor", "middle")
  .text("Month");

svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .text("Adoption Trend");

// Grid lines
svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(
    d3.axisLeft(y)
      .tickSize(-(width - margin.left - margin.right))
      .tickFormat("")
  )
  .attr("color", "#e6e6e6");

// Line generators
const catLine = d3.line()
  .x(d => x(d.month))
  .y(d => y(d.cats))
  .curve(d3.curveMonotoneX);

const dogLine = d3.line()
  .x(d => x(d.month))
  .y(d => y(d.dogs))
  .curve(d3.curveMonotoneX);

// Draw cat line
const catPath = svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "#f4a261")
  .attr("stroke-width", 3)
  .attr("d", catLine);

// Draw dog line
const dogPath = svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "#2a9d8f")
  .attr("stroke-width", 3)
  .attr("d", dogLine);

// Animate lines
function animateLine(path) {
  const totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(2000)
    .ease(d3.easeCubicOut)
    .attr("stroke-dashoffset", 0);
}

animateLine(catPath);
animateLine(dogPath);

// Tooltip functions
function showTooltip(event, label, month, value) {
  tooltip
    .style("opacity", 1)
    .html(`<strong>${label}</strong><br>${month}: ${value}`)
    .style("left", (event.pageX + 12) + "px")
    .style("top", (event.pageY - 28) + "px");
}

function moveTooltip(event) {
  tooltip
    .style("left", (event.pageX + 12) + "px")
    .style("top", (event.pageY - 28) + "px");
}

function hideTooltip() {
  tooltip.style("opacity", 0);
}

// Cat points
svg.selectAll(".cat-dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "cat-dot")
  .attr("cx", d => x(d.month))
  .attr("cy", d => y(d.cats))
  .attr("r", 0)
  .attr("fill", "#f4a261")
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .on("mouseover", (event, d) => showTooltip(event, "Cats", d.month, d.cats))
  .on("mousemove", moveTooltip)
  .on("mouseout", hideTooltip)
  .transition()
  .delay((d, i) => 1500 + i * 80)
  .duration(400)
  .attr("r", 6);

// Dog points
svg.selectAll(".dog-dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "dog-dot")
  .attr("cx", d => x(d.month))
  .attr("cy", d => y(d.dogs))
  .attr("r", 0)
  .attr("fill", "#2a9d8f")
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .on("mouseover", (event, d) => showTooltip(event, "Dogs", d.month, d.dogs))
  .on("mousemove", moveTooltip)
  .on("mouseout", hideTooltip)
  .transition()
  .delay((d, i) => 1700 + i * 80)
  .duration(400)
  .attr("r", 6);

// Legend
const legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", `translate(${width - 150}, ${margin.top})`);

legend.append("line")
  .attr("x1", 0)
  .attr("x2", 30)
  .attr("y1", 0)
  .attr("y2", 0)
  .attr("stroke", "#f4a261")
  .attr("stroke-width", 3);

legend.append("text")
  .attr("x", 40)
  .attr("y", 5)
  .text("Cats");

legend.append("line")
  .attr("x1", 0)
  .attr("x2", 30)
  .attr("y1", 25)
  .attr("y2", 25)
  .attr("stroke", "#2a9d8f")
  .attr("stroke-width", 3);

legend.append("text")
  .attr("x", 40)
  .attr("y", 30)
  .text("Dogs");