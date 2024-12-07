import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Output from "./sidebar/Output";

export default function CalculatorLayout() {
  return (
    <div className="flex flex-row w-full min-h-screen h-screen">
      <Sidebar />
      <Output />
    </div>
  );
}
