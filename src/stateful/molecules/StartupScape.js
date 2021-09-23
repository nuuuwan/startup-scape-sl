import { Component } from "react";
import Startups from "../../core/Startups.js";
import { CATEGORY_TO_COLOR } from "../../constants/CategoryConstants.js";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

import "./StartupScape.css";

const [WIDTH, HEIGHT] = [1600, 900];
const CATEGORY_RECT_RADIUS = 12;
const CATEGORY_TITLE_RECT_PADDING_P = 0.1;
const TREEMAP_PADDING = 24;

function Treemap({ data, width, height }) {
  const svgRef = useRef(null);

  function renderTreemap() {
    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3.treemap().size([width, height]).padding(TREEMAP_PADDING)(root);

    const nodes = svg
      .selectAll("g")
      .data(treemapRoot.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    function nodeWidth(d) {
      return d.x1 - d.x0;
    }
    function nodeHeight(d) {
      return d.y1 - d.y0;
    }

    // nodes
    //   .append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", (d) => nodeWidth(d))
    //   .attr("height", (d) => nodeHeight(d))
    //   .attr("fill", (d) => CATEGORY_TO_COLOR[d.data.name])
    //   .attr("fill-opacity", 0.1)
    //   .attr("stroke", 'black');

    nodes
      .filter((d) => d.data.type === "category")
      .append("rect")
      .attr("class", "rect-category")
      .attr("x", 0)
      .attr("y", 0)
      .attr("rx", CATEGORY_RECT_RADIUS)
      .attr("ry", CATEGORY_RECT_RADIUS)
      .attr("width", (d) => nodeWidth(d) )
      .attr("height", (d) => nodeHeight(d))
      .attr("stroke", (d) => CATEGORY_TO_COLOR[d.data.name])
      .attr("fill", "white");

      nodes
        .filter((d) => d.data.type === "category")
        .append("rect")
        .attr("x", (d) => nodeWidth(d)  * CATEGORY_TITLE_RECT_PADDING_P)
        .attr("y", -CATEGORY_RECT_RADIUS)
        .attr("rx", CATEGORY_RECT_RADIUS)
        .attr("ry", CATEGORY_RECT_RADIUS)
        .attr("width", (d) => nodeWidth(d) * (1 - CATEGORY_TITLE_RECT_PADDING_P * 2))
        .attr("height", (d) => CATEGORY_RECT_RADIUS * 2)
        .attr("fill", "white");

      nodes
        .filter((d) => d.data.type === "category")
        .append("text")
        .attr("x", (d) => nodeWidth(d) / 2)
        .attr("y", 0)
        .attr("width", (d) => nodeWidth(d))
        .attr("height", (d) => nodeHeight(d))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", (d) =>
          Math.min((d.x1 - d.x0) / d.data.name.length, 24)
        )
        .text((d) => d.data.name);

    nodes
      .filter((d) => d.data.type === "startup")
      .append("image")
      .attr("href", (d) => d.data.link)
      .attr("x", (d) => 0)
      .attr("y", (d) => 0)
      .attr("width", (d) => nodeWidth(d))
      .attr("height", (d) => nodeHeight(d) );


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
    const { categoryToIsSelected } = this.props;
    const treemapData = await Startups.getTreeMapData(categoryToIsSelected);
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
