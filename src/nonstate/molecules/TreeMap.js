import * as d3 from "d3";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputLabel from "@mui/material/InputLabel";

import { CATEGORY_TO_COLOR } from "../../constants/CategoryConstants.js";

const TREEMAP_PADDING_INNER = 9;

export default function TreeMap({
  data,
  top,
  left,
  width,
  height,
  onClickImage,
  onClickCategory,
}) {
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
    <Paper sx={{ top, left, position: "fixed" }}>
      {treemapRoot.children.map(function (categoryElement, iCategory) {
        const { x0, y0, x1, y1 } = categoryElement;
        const [left, top] = [x0, y0];
        const [categoryWidth, categoryHeight] = [x1 - x0, y1 - y0];
        const categoryName = categoryElement.data.name;
        const categoryStartups = categoryElement.children.map((d) => d.data);
        const nStartups = categoryStartups.length;

        const effectiveCategoryHeight = Math.max(1, categoryHeight - 36);
        const effectiveCategoryWidth = Math.max(1, categoryWidth - 12);

        const imgDim = parseInt(
          Math.sqrt(
            (effectiveCategoryWidth * effectiveCategoryHeight) / nStartups
          )
        );
        const nCols = parseInt(effectiveCategoryWidth / imgDim);
        const nRows = parseInt(nStartups / nCols) + 1;
        const startupWidth = (0.8 * effectiveCategoryWidth) / nCols;
        const startupHeight = (0.8 * effectiveCategoryHeight) / nRows;
        const categoryLabel = `${categoryName} (${nStartups})`;

        const color = CATEGORY_TO_COLOR[categoryName];

        const onClickCategoryInner = function () {
          onClickCategory(categoryName);
        };

        return (
          <Box
            key={`category-${iCategory}`}
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
              sx={{ borderColor: color, borderWidth: 3, borderRadius: 3 }}
              variant="outlined"
            >
              <InputLabel
                sx={{
                  color,
                  paddingTop: 0.5,
                  paddingLeft: 0.5,
                  paddingRight: 0.5,
                }}
                shrink
                onClick={onClickCategoryInner}
              >
                {categoryLabel}
              </InputLabel>

              <ImageList
                sx={{
                  width: effectiveCategoryWidth,
                  height: effectiveCategoryHeight,
                  marginTop: 0,
                  padding: 0.5,
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
                            maxHeight: startupHeight,
                            maxWidth: startupWidth,
                          }}
                          onClick={onClick}
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
    </Paper>
  );
}
