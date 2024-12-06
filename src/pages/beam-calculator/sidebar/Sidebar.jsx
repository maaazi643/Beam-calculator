import React from "react";
import Scroller from "../../../components/scrollers/Scroller";
import SmallHeader from "../../../components/typography/SmallHeader";
import SpanSection from "./SpanSection";
import LoadingSection from "./LoadingSection";
import SupportSection from "./SupportSection";
import SolveButton from "../../../components/buttons/SolveButton";

export default function Sidebar() {
  return (
    <div className="flex flex-col basis-[25%] py-12 px-8 justify-between gap-y-4 h-full">
      <Scroller className="grow space-y-[1.5rem] overflow-y-auto">
        <div className="">
          <SmallHeader>Beam Properties</SmallHeader>
        </div>
        <SpanSection />
        <SupportSection />
        <LoadingSection />
      </Scroller>
      <div className="">
        <SolveButton>Solve</SolveButton>
      </div>
    </div>
  );
}
