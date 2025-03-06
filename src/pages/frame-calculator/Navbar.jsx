import React from "react";
import LeftArrow from "../../icons/LeftArrow";
import { NavLink } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { uiActions } from "../../store/ui";

export default function Navbar() {
  const dispatch = useDispatch();
  const { showSidebarOnMobile } = useSelector((state) => state.ui);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const toggleSidebarHandler = () => {
    dispatch(
      uiActions.set({
        key: "showSidebarOnMobile",
        value: !showSidebarOnMobile,
      })
    );
  };

  return (
    <div className="flex items-center justify-between">
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
          Frame Calculator{" "}
        </span>
      </div>
      {isMobile && <SettingsIcon onClick={toggleSidebarHandler} />}
    </div>
  );
}
