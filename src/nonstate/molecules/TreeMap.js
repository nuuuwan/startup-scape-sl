import * as d3 from "d3";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputLabel from "@mui/material/InputLabel";

import { CATEGORY_TO_COLOR } from "../../constants/CategoryConstants.js";

const TREEMAP_PADDING_INNER = 9;
const HEADER_GAP = 24;
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
              <InputLabel
                sx={{
                  maxWidth: categoryWidth,
                  paddingTop: 0.5,
                  paddingLeft: 1,
                  color,
                }}
              >
                {categoryLabel}
              </InputLabel>

              <ImageList
                sx={{
                  width: effectiveCategoryWidth,
                  height: effectiveCategoryHeight,
                  margin: 1,
                }}
                cols={nCols}
                rowHeight={startupHeight}
              >
                {categoryStartups.map(function (startup, iStartup) {
                  const startupID = startup.startupID;
                  const imageFileOnly = startup.imageFileOnly;
                  const imgSrc = require("../../assets/images/startup_images/" +
                    imageFileOnly).default;
                  const key = "image-" + startupID;

                  function onClick(e) {
                    onClickImage(startupID);
                  }

                  return (
                    <ImageListItem key={key}>
                      <Tooltip title={startup.startupName}>
                        <img
                          alt={startupID}
                          src={imgSrc}
                          style={{
                            maxHeight: startupHeight * 0.8,
                            maxWidth: startupWidth * 0.8,
                          }}
                          onClick={onClick}
                          loading="lazy"
                        />
                      </Tooltip>
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </Paper>
          </Box>
        );
      })}
    </>
  );
}
