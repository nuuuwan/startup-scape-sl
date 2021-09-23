import { Component } from "react";
import Startups from "../../core/Startups.js";
import { CATEGORY_TO_COLOR } from "../../constants/CategoryConstants.js";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

import "./StartupScape.css";

const [WIDTH, HEIGHT] = [1600, 900];
const CATEGORY_PADDING = 12;
const STARTUP_PADDING = 3;

function Treemap({ data, width, height }) {
  const svgRef = useRef(null);

  function renderTreemap() {
    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

    const nodes = svg
      .selectAll("g")
      .data(treemapRoot.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    nodes
      .filter((d) => d.data.type === "category")
      .append("rect")
      .attr("class", "rect-category")
      .attr("x", CATEGORY_PADDING)
      .attr("y", CATEGORY_PADDING)
      .attr("rx", CATEGORY_PADDING)
      .attr("ry", CATEGORY_PADDING)
      .attr("width", (d) => d.x1 - d.x0 - CATEGORY_PADDING * 2)
      .attr("height", (d) => d.y1 - d.y0 - CATEGORY_PADDING * 2)
      .attr("stroke", (d) => CATEGORY_TO_COLOR[d.data.name])
      .attr("fill", "white");

    nodes
      .filter((d) => d.data.type === "startup")
      .append("image")
      .attr("href", (d) => d.data.link)
      .attr("x", STARTUP_PADDING)
      .attr("y", STARTUP_PADDING)
      .attr("width", (d) => Math.max(0, d.x1 - d.x0 - STARTUP_PADDING * 2))
      .attr("height", (d) => Math.max(0, d.y1 - d.y0 - STARTUP_PADDING * 2));

    nodes
      .filter((d) => d.data.type === "category")
      .append("rect")
      .attr("x", (d) => (d.x1 - d.x0) * 0.2)
      .attr("y", CATEGORY_PADDING * 0.5)
      .attr("rx", CATEGORY_PADDING)
      .attr("ry", CATEGORY_PADDING)
      .attr("width", (d) => (d.x1 - d.x0) * 0.6)
      .attr("height", (d) => CATEGORY_PADDING)
      .attr("fill", "white");

    nodes
      .filter((d) => d.data.type === "category")
      .append("text")
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", STARTUP_PADDING * 0.5)
      .attr("width", (d) => d.x1 - d.x0 - STARTUP_PADDING * 2)
      .attr("height", (d) => d.y1 - d.y0 - STARTUP_PADDING * 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", (d) =>
        Math.min((d.x1 - d.x0) / d.data.name.length, 24)
      )
      .text((d) => d.data.name);
  }

  useEffect(() => {
    renderTreemap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default class StartupScape extends Component {
  constructor(props) {
    super(props);
    this.state = { treemapData: undefined };
  }

  async componentDidMount() {
    const treemapData = await Startups.getTreeMapData();
    this.setState({ treemapData });
  }

  render() {
    const { treemapData } = this.state;
    if (treemapData === undefined) {
      return "Loading...";
    }

    return (
      <div>
        <Treemap data={treemapData} height={HEIGHT} width={WIDTH} />
      </div>
    );
  }
}
