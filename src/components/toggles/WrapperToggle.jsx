import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { COLORS } from "../../../tailwind.config";

const HiddenInput = styled("input")`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const ToggleWrapper = styled("div")`
  position: relative;
  width:1.82rem; /* 23px */
  height: 0.875rem; /* 14px */
  background-color: ${(props) =>
    props.checked ? COLORS.secondary : COLORS.primary};
  border-radius: 9999px;
  transition: background-color 0.3s;
  cursor: pointer;
  border: 1px solid ${(props) => (props.checked ? "white" : COLORS.secondary)};

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => (props.checked ? "#bfdbfe" : "#dbeafe")};
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: ${(props) => (props.checked ? "calc(100% - 13px)" : "1px")};
    transform: translateY(-50%);
    width: 0.75rem; /* 12px */
    height: 0.75rem; /* 12px */
    background-color: ${(props) => (props.checked ? "white" : COLORS.secondary)};
    border: 1px solid ${(props) => (props.checked ? "white" : COLORS.secondary)};
    border-radius: 50%;
    transition: left 0.3s, border-color 0.3s;
  }
`;

const LabelWrapper = styled("label")`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export default function WrapperToggle({ checked, onChange, className }) {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <LabelWrapper className={className}>
      <span className="text-[#212121] text-sm not-italic font-semibold leading-[133%] font-inter">
        Sinking
      </span>
      <HiddenInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <ToggleWrapper checked={checked} />
    </LabelWrapper>
  );
}

WrapperToggle.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
