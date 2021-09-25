
import * as d3 from "d3";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const TREEMAP_PADDING_INNER = 5;
const TREEMAP_PADDING_TOP = 24;
const TREEMAP_PADDING_BOTTOM = 3;
const TREEMAP_PADDING_OUTER = 3;

export default function TreeMap({ data, width, height, onClickImage }) {

  const root = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  const treemap = d3
    .treemap()
    .size([width, height])
    .paddingInner(TREEMAP_PADDING_INNER)
    .paddingOuter(TREEMAP_PADDING_OUTER)
    .paddingTop(TREEMAP_PADDING_TOP)
    .paddingBottom(TREEMAP_PADDING_BOTTOM);
  const treemapRoot = treemap(root);

  const description = 'test';
  return (
    <div>
        {treemapRoot.children.map(
          function(categoryElement) {
            const {x0, y0, x1, y1} = categoryElement;
            const left = x0;
            const top = y0;
            const width = x1 - x0;
            const height = y1 - y0;
            return (
              <Box
                sx={{
                  'position': 'fixed',
                  top,
                  left,
                  '& > :not(style)': {
                    m: 2,
                    width,
                    height,
                  },
                }}
              >
                <Paper />
              </Box>
            )
          }
        )}
    </div>
  )
}
