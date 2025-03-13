import Sidebar from "./Sidebar";
import Output from "./Output";
import ControlBar from "./ControlBar";
export default function CalculatorLayout() {
  return (
    <div className="sm:flex sm:flex-col w-full max-w-[70%] mx-auto  ">
      <Output />
      <Sidebar />
      <ControlBar className="" />
    </div>
  );
}
