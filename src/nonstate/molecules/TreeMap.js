import * as d3 from "d3";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CategoryIcon from "@mui/icons-material/Category";

import { CATEGORY_TO_COLOR } from "../../constants/CategoryConstants.js";

const TREEMAP_PADDING_INNER = 9;
const HEADER_GAP = 36;
const CATEGORY_PADDING = 6;

export default function TreeMap({ data, width, height, onClickImage }) {
  if (data.children.length === 0) {
    return null;
  }

  const root = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  const treemap = d3
    .treemap()
    .size([width, height])
    .paddingInner(TREEMAP_PADDING_INNER);
  const treemapRoot = treemap(root);

  return (
    <>
      {treemapRoot.children.map(function (categoryElement) {
        const { x0, y0, x1, y1 } = categoryElement;
        const [left, top] = [x0, y0];
        const [categoryWidth, categoryHeight] = [x1 - x0, y1 - y0];
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

        const color = CATEGORY_TO_COLOR[categoryName];

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
            <Paper
              elevation={6}
              sx={{ borderColor: color, borderWidth: 3, borderRadius: 3 }}
              variant="outlined"
            >
              <Chip
                label={categoryLabel}
                icon={<CategoryIcon sx={{ fill: color }} />}
                sx={{ background: "white", color }}
              />

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
                  <Tooltip title={startup.startupName}>
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
                  </Tooltip>
                );
              })}
            </Paper>
          </Box>
        );
      })}
    </>
  );
}
