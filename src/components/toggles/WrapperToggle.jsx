import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { COLORS } from "../../../tailwind.config";

const LabelWrapper = styled("label")`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const WrapperSwitch = styled(Switch)(({ checked }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: COLORS.secondary, // Active background color
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: checked ? "#fff" : COLORS.secondary, // Secondary color for inactive dot
    transition: "background-color 200ms, width 200ms",
  },
  "& .MuiSwitch-track": {
    borderRadius: 8,
    opacity: 1,
    backgroundColor: COLORS.primary, // Inactive background color
    border: `1px solid ${COLORS.secondary}`, // Secondary border when inactive
    boxSizing: "border-box",
  },
}));

export default function WrapperToggle({ checked, onChange, className }) {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <LabelWrapper className={className}>
      <span className="text-[#212121] text-sm not-italic font-semibold leading-[133%] font-inter">
        Sinking
      </span>
      <FormGroup>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <WrapperSwitch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "ant design" }}
          />
        </Stack>
      </FormGroup>
    </LabelWrapper>
  );
}

WrapperToggle.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
