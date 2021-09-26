import * as d3 from "d3";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const TREEMAP_PADDING_INNER = 6;
const HEADER_GAP = 24;
const CATEGORY_PADDING = 6;

export default function TreeMap({ data, width, height, onClickImage }) {
  const root = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  const treemap = d3
    .treemap()
    .size([width, height])
    .paddingInner(TREEMAP_PADDING_INNER);
  const treemapRoot = treemap(root);

  if (!treemapRoot.children) {
    return null;
  }

  return (
    <div>
      {treemapRoot.children.map(function (categoryElement) {
        const { x0, y0, x1, y1 } = categoryElement;
        const left = x0;
        const top = y0;
        const categoryWidth = x1 - x0;
        const categoryHeight = y1 - y0;

        const categoryName = categoryElement.data.name;
        const categoryStartups = categoryElement.children.map((d) => d.data);
        const nStartups = categoryStartups.length;

        const effectiveCategoryHeight =
          categoryHeight - HEADER_GAP - CATEGORY_PADDING * 2;
        const effectiveCategoryWidth = categoryWidth - CATEGORY_PADDING * 2;
        const imgDim = parseInt(
          Math.sqrt(
            (effectiveCategoryWidth * effectiveCategoryHeight) / nStartups
          )
        );
        const nCols = parseInt(effectiveCategoryWidth / imgDim);
        const nRows = parseInt(nStartups / nCols) + 1;

        const startupWidth = effectiveCategoryWidth / nCols;
        const startupHeight = effectiveCategoryHeight / nRows;
        const categoryLabel = `${categoryName} (${nStartups})`;

        return (
          <Box
            sx={{
              position: "absolute",
              top,
              left,
              "& > :not(style)": {
                width: categoryWidth,
                height: categoryHeight,
              },
            }}
          >
            <Paper elevation={6}>
              <Typography variant="caption" display="block" padding={0.5}>
                {categoryLabel}
              </Typography>
              {categoryStartups.map(function (startup, iStartup) {
                const startupID = startup.startupID;
                const imageFileOnly = startup.imageFileOnly;
                const imgSrc = require("../../assets/images/startup_images/" +
                  imageFileOnly).default;

                const iCol = iStartup % nCols;
                const iRow = parseInt(iStartup / nCols);

                function onClick(e) {
                  onClickImage(startupID);
                }

                return (
                  <img
                    alt={startupID}
                    src={imgSrc}
                    style={{
                      position: "absolute",
                      maxWidth: startupWidth * 0.8,
                      maxHeight: startupHeight * 0.8,
                      left: CATEGORY_PADDING + iCol * startupWidth,
                      top: CATEGORY_PADDING + HEADER_GAP + iRow * startupHeight,
                    }}
                    onClick={onClick}
                  />
                );
              })}
            </Paper>
          </Box>
        );
      })}
    </div>
  );
}