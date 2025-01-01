import React from "react";
import Sidebar from "./Sidebar";
import Output from "./Output";

export default function CalculatorLayout() {
  return (
    <div className="sm:flex sm:flex-row w-full min-h-screen h-screen max-h-screen overflow-hidden">
      <Sidebar />
      <Output />
    </div>
  );
}
