import React from "react";
import Sidebar from "./sidebar/Sidebar";

export default function CalculatorLayout() {
  return <div className="flex flex-row w-full min-h-screen border border-red-500">
    <Sidebar/>
    <div className="border border-red-500 basis-[75%] py-16 px-8"></div>
  </div>;
}
