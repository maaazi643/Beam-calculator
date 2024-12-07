import React from "react";
import Scroller from "../../../components/scrollers/Scroller";
import { Outlet } from "react-router";
import { TypeAnimation } from "react-type-animation";
import Navbar from "./Navbar";
import BigHeader from "../../../components/typography/BigHeader";
import Tabs from "./Tabs";
import ControlBar from "./ControlBar";

export default function Output() {
  return (
    <div className="basis-[75%] py-12 px-8 bg-tertiary flex flex-col gap-y-6 h-full max-h-full relative">
      <Navbar />
      <BigHeader>
        <TypeAnimation
          sequence={["Beam Calculator - Group 6 CEG 410", 1000]}
          wrapper="span"
          speed={50}
          cursor={false}
        />
      </BigHeader>
      <div className="grow bg-primary p-4 flex flex-col overflow-y-auto max-h-[70%]">
        <Tabs />
        <Scroller className="grow overflow-y-auto p-4">
          <Outlet />
        </Scroller>
      </div>
      <ControlBar className="absolute bottom-0 left-0 w-full" />
    </div>
  );
}
