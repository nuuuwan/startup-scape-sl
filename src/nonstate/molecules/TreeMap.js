import { CATEGORY_TO_COLOR } from "../../constants/CategoryConstants.js";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

import "./TreeMap.css";

const TREEMAP_PADDING = 24;

function nodeWidth(d) {
  return `${d.x1 - d.x0}`;
}
function nodeHeight(d) {
  return `${d.y1 - d.y0}`;
}

function getImage(d) {
  const imageFileOnly = d.data.imageFileOnly;
  return require("../../assets/images/startup_images/" + imageFileOnly).default;
}

export default function TreeMap(props) {
  const { data, width, height, onClickImage } = props;
  const ref = useRef(null);

  function renderTreeMap() {
    const div = d3.select(ref.current);

    div.selectAll("*").remove();

    div
      .attr("class", "div-node")
      .attr("style", `width: ${width}px; height: ${height}px; `);

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const treemap = d3.treemap().size([width, height]).padding(TREEMAP_PADDING);
    const treemapRoot = treemap(root);

    const nodes = div
      .selectAll("div.div-node")
      .data(treemapRoot.descendants())
      .join("div")
      .attr("class", "div-node")
      .attr(
        "style",
        (d) =>
          `position:absolute;
          left:${d.x0}px;
          top:${d.y0}px;
          width:${nodeWidth(d)}px;
          height:${nodeHeight(d)}px; `
      );

    nodes
      .filter((d) => d.data.type === "category")
      .append("div")
      .attr("class", "div-category-title")
      .attr(
        "style",
        (d) =>
          `color: ${CATEGORY_TO_COLOR[d.data.name]};
          font-size: ${Math.min(
            18,
            (1.5 * nodeWidth(d)) / d.data.name.length
          )}px; `
      )
      .text((d) => d.data.name);

    nodes
      .filter((d) => d.data.type === "category")
      .append("div")
      .attr("class", "div-category")
      .attr(
        "style",
        (d) => `border-color: ${CATEGORY_TO_COLOR[d.data.name]}; `
      );

    nodes
      .filter((d) => d.data.type === "startup")
      .append("img")
      .attr("class", "img-startup")
      .attr("src", (d) => getImage(d))
      .on("click", onClickImage);
  }

  useEffect(() => {
    renderTreeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div className="div-root" ref={ref} />;
}
