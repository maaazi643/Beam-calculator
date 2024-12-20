import React from "react";
import Scroller from "../../components/scrollers/Scroller";
import SmallHeader from "../../components/typography/SmallHeader";
import SpanSection from "./SpanSection";
import LoadingSection from "./LoadingSection";
import SupportSection from "./SupportSection";
import SolveButton from "../../components/buttons/SolveButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { beamActions } from "../../store/beam";
import { getBeamAnalysis } from "../../store/beam-fem";
import {
  validateSpans,
  validateSupports,
  validateLoadings,
} from "../../utils/validators";
import { getBeamTotalLength } from "../../store/beam-utils";
import { toast } from "react-hot-toast";
import { COLORS } from "../../../tailwind.config";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isLocalHost() {
  return location.hostname === "localhost" || location.hostname === "127.0.0.1";
}

export const showNotification = (errorMessage) => {
  toast.error(errorMessage, {
    duration: 4000, // Toast duration in milliseconds
    style: {
      background: COLORS.tertiary,
      color: COLORS.error,
      fontSize: "16px",
      padding: "12px",
    },
  });
};

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { beamProperties } = useSelector((state) => state.beam);

  // console.log(beamProperties);

  const solveHandler = async () => {
    const [spansAreValid, errorMessage1] = validateSpans(beamProperties.spans);
    if (!spansAreValid) {
      showNotification(errorMessage1);
      return;
    }
    const [supportsAreValid, errorMessage2] = validateSupports(
      beamProperties.supports,
      getBeamTotalLength(beamProperties)
    );
    if (!supportsAreValid) {
      showNotification(errorMessage2);
      return;
    }
    const [loadingsAreValid, errorMessage3] = validateLoadings(
      beamProperties.loadings,
      getBeamTotalLength(beamProperties)
    );
    if (!loadingsAreValid) {
      showNotification(errorMessage3);
      return;
    }

    try {
      navigate("/beam-calculator/steps");

      dispatch(
        beamActions?.set([
          { key: "solutionIsLoading", value: true },
          {
            key: "solutionAnalysisErrorMessage",
            value: "",
          },
        ])
      );

      if (!isLocalHost()) {
        const num = randomInteger(1500, 2500);
        console.log(num);
        await sleep(num);
      }

      // const num = randomInteger(1500, 2500);
      // await sleep(num);
      const analysis = getBeamAnalysis(beamProperties);
      dispatch(
        beamActions?.set([{ key: "solutionAnalysis", value: analysis }])
      );
    } catch (error) {
      console.error(error);
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
