import React from "react";
import Scroller from "../../components/scrollers/Scroller";
import SmallHeader from "../../components/typography/SmallHeader";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Beam from "./Beam";
import SolveButton from "../../components/buttons/SolveButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { beamActions } from "../../store/beam";
import { uiActions } from "../../store/ui";
// import { getBeamAnalysis } from "../../store/beam-calc";
import { getFrameAnalysis } from "../../store/frame-calc";
import { validateColumn, validateBeam } from "../../utils/validators";
import { toast } from "react-hot-toast";
import { COLORS } from "../../../tailwind.config";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "react-responsive";
import { twMerge } from "tailwind-merge";

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
  const { frameProperties } = useSelector((state) => state.frame);
  const { showSidebarOnMobile } = useSelector((state) => state.ui);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const toggleSidebarHandler = () => {
    dispatch(
      uiActions.set({
        key: "showSidebarOnMobile",
        value: !showSidebarOnMobile,
      })
    );
  };

  const solveHandler = async () => {
    const [leftColumnIsValid, errorMessage1] = validateColumn(
      "left column",
      frameProperties.leftColumn
    );
    if (!leftColumnIsValid) {
      showNotification(errorMessage1);
      return;
    }
    const [rightColumnIsValid, errorMessage2] = validateColumn(
      "right column",
      frameProperties.rightColumn
    );
    if (!rightColumnIsValid) {
      showNotification(errorMessage2);
      return;
    }
    const [beamIsValid, errorMessage3] = validateBeam(frameProperties.beam);
    if (!beamIsValid) {
      showNotification(errorMessage3);
      return;
    }

    try {
      toggleSidebarHandler();
      navigate("/frame-calculator/solution");

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
        await sleep(num);
      }

      const num = randomInteger(1500, 2500);
      await sleep(num);
      const analysis = getFrameAnalysis(frameProperties);
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
    <div
      className={twMerge(
        "bg-primary fixed top-0 w-full z-10 sm:static flex flex-col basis-[25%] sm:min-w-[350px] py-10 sm:py-12 px-6 sm:px-8 justify-between gap-y-4 h-full sm:max-h-full sm:items-stretch transition-all duration-300 ease-in-out",
        `${showSidebarOnMobile ? "left-0" : "-left-full"}`
      )}
    >
      <Scroller className="grow space-y-[1.5rem] overflow-y-auto">
        <div className="flex items-center justify-between">
          <SmallHeader>Frame Properties</SmallHeader>
          {isMobile && (
            <CloseIcon
              className="text-secondary"
              onClick={toggleSidebarHandler}
            />
          )}
        </div>
        <LeftColumn />
        <Beam />
        <RightColumn />
      </Scroller>
      <div className="">
        <SolveButton onClick={solveHandler}>Solve</SolveButton>
      </div>
    </div>
  );
}
