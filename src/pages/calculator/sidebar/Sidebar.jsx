import React from "react";
import SmallHeader from "../../../components/typography/SmallHeader";
import LoadingSection from "./LoadingSection";

export default function Sidebar() {
  return (
    <div className="border border-red-500 basis-[25%] py-16 px-12 space-y-[1.5rem]">
      <div className="">
        <SmallHeader>Properties</SmallHeader>
      </div>
      <LoadingSection />
    </div>
  );
}
