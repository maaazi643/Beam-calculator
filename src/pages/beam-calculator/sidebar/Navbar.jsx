import React from "react";
import LeftArrow from "../../../icons/LeftArrow";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div className="flex gap-x-2">
      <NavLink to="/" className="flex gap-x-2">
        <LeftArrow />
        <span className="text-secondary-2 text-sm not-italic font-normal leading-[133%]">
          Home
        </span>
      </NavLink>
      <span className="text-secondary-2 text-sm not-italic font-normal leading-[133%]">
        /
      </span>
      <span className="text-secondary text-sm not-italic font-semibold leading-[133%]">
        Beam Calculator{" "}
      </span>
    </div>
  );
}
