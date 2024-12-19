import React from "react";
import Scroller from "../../../components/scrollers/Scroller";
import SmallHeader from "../../../components/typography/SmallHeader";
import SpanSection from "./SpanSection";
import LoadingSection from "./LoadingSection";
import SupportSection from "./SupportSection";
import SolveButton from "../../../components/buttons/SolveButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { beamActions } from "../../../store/beam";
import { getBeamAnalysis } from "../../../store/beam-fem";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Sidebar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { beamProperties } = useSelector((state) => state.beam);

  console.log(beamProperties);

  const solveHandler = async () => {
    try {
      navigate("/beam-calculator/steps")
      dispatch(
        beamActions?.set([
          { key: "solutionIsLoading", value: true },
          {
            key: "solutionAnalysisErrorMessage",
            value: "",
          },
        ])
      );
      // const num = randomInteger(1500, 2500);
      // await sleep(num);
      const analysis = getBeamAnalysis(beamProperties);
      dispatch(
        beamActions?.set([{ key: "solutionAnalysis", value: analysis }])
      );
    } catch (error) {
      dispatch(
        beamActions?.set([
          {
            key: "solutionAnalysisErrorMessage",
            value: error?.message,
          },
          {
            key: "solutionAnalysis",
            value: {},
          },
        ])
      );
    } finally {
      dispatch(beamActions?.set([{ key: "solutionIsLoading", value: false }]));
    }
  };

  return (
    <div className="flex flex-col basis-[25%] min-w-[350px] py-12 px-8 justify-between gap-y-4 h-full max-h-full items-stretch">
      <Scroller className="grow space-y-[1.5rem] overflow-y-auto">
        <div className="">
          <SmallHeader>Beam Properties</SmallHeader>
        </div>
        <SpanSection />
        <SupportSection />
        <LoadingSection />
      </Scroller>
      <div className="">
        <SolveButton onClick={solveHandler}>Solve</SolveButton>
      </div>
    </div>
  );
}
