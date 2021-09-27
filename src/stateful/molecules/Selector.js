import { Component } from "react";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import "./Selector.css";

const TEXT_SELECT_ALL = "Select All";
const TEXT_UNSELECT_ALL = "Unselect All";

export default class Selector extends Component {
  render() {
    const { label, valueToIsSelected, onChange, icon } = this.props;

    const allValues = Object.keys(valueToIsSelected);
    const selectedValues = Object.entries(valueToIsSelected)
      .filter(([value, isSelected]) => isSelected)
      .map(([value, isSelected]) => value);
    const nAll = allValues.length;
    const nSelected = selectedValues.length;

    const areAllSelected = nAll === nSelected;
    const areNoneSelected = 0 === nSelected;

    function onChangeInner(e) {
      const newSelectedValues = e.target.value;

      let newValueToIsSelected;
      if (newSelectedValues.includes(TEXT_SELECT_ALL)) {
        newValueToIsSelected = allValues.reduce(function (
          newValueToIsSelected,
          value
        ) {
          newValueToIsSelected[value] = true;
          return newValueToIsSelected;
        },
        {});
      } else if (newSelectedValues.includes(TEXT_UNSELECT_ALL)) {
        newValueToIsSelected = allValues.reduce(function (
          newValueToIsSelected,
          value
        ) {
          newValueToIsSelected[value] = false;
          return newValueToIsSelected;
        },
        {});
      } else {
        newValueToIsSelected = allValues.reduce(function (
          newValueToIsSelected,
          value
        ) {
          newValueToIsSelected[value] = newSelectedValues.includes(value);
          return newValueToIsSelected;
        },
        {});
      }
      onChange(newValueToIsSelected);
    }

    const menuDisplayValues = [].concat(
      [TEXT_SELECT_ALL, TEXT_UNSELECT_ALL],
      allValues
    );

    const labelFinal = `${label} (${nSelected} selected)`;

    return (
      <Box sx={{ minWidth: 120, margin: 3 }}>
        <FormControl fullWidth>
          <InputLabel>{labelFinal}</InputLabel>
          <Select
            multiple
            label={labelFinal}
            value={selectedValues}
            onChange={onChangeInner}
            renderValue={(selected, iSelected) => (
              <Box
                key={`selected-${selected}-${iSelected}`}
                sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
              >
                {selected.map((value, iValue) => (
                  <Chip
                    key={`chip-${value}-${iValue}`}
                    label={value}
                    icon={icon}
                    size={"small"}
                  />
                ))}
              </Box>
            )}
          >
            {menuDisplayValues.map(function (name) {
              let disabled =
                (name === TEXT_SELECT_ALL && areAllSelected) ||
                (name === TEXT_UNSELECT_ALL && areNoneSelected);
              return (
                <MenuItem
                  key={name}
                  value={name}
                  disabled={disabled}
                  dense
                >
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
}
