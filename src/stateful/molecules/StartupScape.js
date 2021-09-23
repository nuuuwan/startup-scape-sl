import { Component } from "react";
import Startups from "../../core/Startups.js";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

const [WIDTH, HEIGHT] = [1600, 900];

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
      .data(treemapRoot.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    const fader = (color) => d3.interpolateRgb(color, "#fff")(0.3);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    // nodes
    //   .append("rect")
    //   .attr("width", (d) => d.x1 - d.x0)
    //   .attr("height", (d) => d.y1 - d.y0)
    //   .attr("fill", (d) => colorScale(d.data.name));

    nodes
      .append('image')
      .attr('href', (d) => d.data.link)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)

  }

  useEffect(() => {
    renderTreemap();
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
