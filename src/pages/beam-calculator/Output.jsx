import React from "react";
import Scroller from "../../components/scrollers/Scroller";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import BigHeader from "../../components/typography/BigHeader";
import Tabs from "./Tabs";
import ControlBar from "./ControlBar";

export default function Output() {
  return (
    <>
      <div className="w-full sm:basis-[75%] bg-[#7B3F00] flex flex-col justify-between h-full max-h-full relative overflow-y-hidden rounded-[10px] my-10 ">
        <div className="flex flex-col gap-y-3 py-10 sm:py-12 px-6 sm:px-8 grow overflow-y-auto">
          <Navbar />
          <BigHeader className="min-h-9 text-[#fff]">Beam Calculator</BigHeader>
          <div className="grow bg-[#F0E68C] p-4 flex flex-col overflow-y-auto rounded-[10px]">
            <Tabs />
            <Scroller className="grow overflow-y-auto py-4 px-2 sm:px-6">
              <Outlet />
            </Scroller>
          </div>
        </div>
      </div>
    </>
  );
}
