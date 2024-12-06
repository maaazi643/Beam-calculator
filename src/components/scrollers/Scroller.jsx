import React from "react";
import { styled } from "@mui/system";

const Scroller = styled("div")`
  /* Custom Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f4f4f4; /* Light gray background for the scrollbar track */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b0b0b0; /* Medium gray for the scrollbar thumb */
    border-radius: 4px;
    transition: background 0.3s;

    &:hover {
      background: #8a8a8a; /* Darker gray when hovered */
    }
  }

  /* For non-Webkit browsers */
  scrollbar-width: thin; /* Firefox: thin scrollbar */
  scrollbar-color: #b0b0b0 #f4f4f4; /* Thumb and track colors */
`;

export default Scroller;
