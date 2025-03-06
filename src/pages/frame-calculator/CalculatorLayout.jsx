import React from "react";
import Sidebar from "./Sidebar";
import Output from "./Output";
import AlertModal from "./AlertModal";
import useLocalStorage from "../../hooks/utils/useLocalStorage";


export default function CalculatorLayout() {
  const [showWatchFrameVideoAlert, setShowWatchFrameVideoAlert] =
    useLocalStorage("showWatchFrameVideoAlert", true);

  return (
    <div className="sm:flex sm:flex-row w-full min-h-screen h-screen max-h-screen overflow-hidden">
      <AlertModal
        isVisible={showWatchFrameVideoAlert}
        onClose={() => setShowWatchFrameVideoAlert(false)}
      />
      <Sidebar />
      <Output />
    </div>
  );
}
