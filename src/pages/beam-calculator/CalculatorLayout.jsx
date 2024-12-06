import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Output from "./sidebar/Output";

export default function CalculatorLayout() {
  return <div className="flex flex-row w-full h-screen min-h-screen">
    <Sidebar/>
    <Output/>
  </div>;
}
