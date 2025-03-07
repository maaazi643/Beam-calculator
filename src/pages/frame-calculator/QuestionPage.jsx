import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  //   BeamIcon,
  SinglePointLoadIcon,
  UniformDistributedLoadIcon,
  VaryingDistributedLoadIcon,
  PinnedSupportIcon,
  RollerSupportIcon,
  //   FixedSupportIcon,
  //   DimensionMark,
  //   FlexuralRigidityMark,
  //   LoadingMark,
  //   FullDimensionMark,
  HorizontalSinglePointLoad,
  FixedSupportUpright,
  VerticalUniformDistributedLoadIcon,
  VerticalVaryingDistributedLoadIcon,
} from "../../icons/Properties";
import { AnimatePresence, motion } from "framer-motion";
import {
  //   getLoadPositionAndDimension,
  loadingEnums,
  //   getSupportPositionAndDimension,
  supportEnums,
  //   getDimensionMarkings,
  //   getFlexuralRigidityMarkings,
  //   getLoadMarkings,
  //   getBeamTotalLength,
} from "../../store/beam-utils";
// import { beamActions } from "../../store/beam";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { isFrameEmpty } from "../../store/frame";
// import JSONFormatter from "json-formatter-js";
import JsonFormatter from "react-json-formatter";

const darkTheme = {
  propertyStyle: { color: "#4a4a4a" }, // Neutral gray for property names
  stringStyle: { color: "#4caf50" }, // Soft green for strings
  numberStyle: { color: "#ffa726" }, // Warm orange for numbers
  booleanStyle: { color: "#42a5f5" }, // Cool blue for booleans
  nullStyle: { color: "#9e9e9e", fontStyle: "italic" }, // Gray italic for null
  bracketStyle: { color: "#6d6d6d" }, // Dark gray for brackets
};

export default function QuestionPage() {
  const dispatch = useDispatch();
  const diagramRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [topToBeam, setTopToBeam] = useState(0);
  const [beamToBottom, setBeamToBottom] = useState(0);
  const { frameProperties } = useSelector((state) => state.frame);
  const { beam, leftColumn, rightColumn } = frameProperties;
  const { length: leftColumnLength } = leftColumn;
  const { length: rightColumnLength } = rightColumn;

  useEffect(() => {
    if (diagramRef?.current) {
      const diagramWrapper = diagramRef?.current;
      const diagramWrapperRect = diagramWrapper?.getBoundingClientRect();
      const beamEl = diagramWrapper?.querySelector("div#beam");
      const beamElRect = beamEl?.getBoundingClientRect();
      const topDiff = Math.abs(diagramWrapperRect.top - beamElRect.top);
      const bottomDiff = Math.abs(
        diagramWrapperRect.bottom - beamElRect.bottom
      );
      setHeight(diagramWrapperRect.height);
      setTopToBeam(topDiff);
      setBeamToBottom(bottomDiff);
      console.log(topDiff, bottomDiff);
      console.log(diagramWrapperRect.height);
      // console.log(heightDiff);
      // setHeightDiffPercent((heightDiff / diagramWrapperRect.height) * 100);
      // const heightDiffPercent = (heightDiff / diagramWrapperRect.height) * 100
      // console.log(heightDiffPercent);
    }
  }, [diagramRef?.current]);

  const dim = {
    leftColumnLength,
    rightColumnLength,
    height,
    topToBeam,
    beamToBottom,
  };

  const showFrameImage = isFrameEmpty(frameProperties);

  if (showFrameImage) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <EngineeringIcon
          className="text-secondary"
          style={{ fontSize: "9rem" }}
        />

        <p className="text-xl font-medium text-secondary text-center">
          Please apply at least one span.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div
        ref={diagramRef}
        className="h-full w-full max-w-[50%] mx-auto relative"
      >
        {+beam?.length > 0 && <BeamDiagram beam={beam} />}
        {+leftColumn?.length > 0 && <LeftColumn column={leftColumn} dim={dim} />}
        {+rightColumn?.length > 0 && <RightColumn column={rightColumn} dim={dim} />}
      </div>
      {/* <JsonFormatter json={frameProperties} tabWith={2} jsonStyle={darkTheme} /> */}
    </AnimatePresence>
  );
}

function BeamDiagram({ beam }) {
  const { loading, length, flexuralRigidity } = beam;
  const {
    type,
    distanceFromLeft,
    spanOfLoading,
    valueOfLoading,
    openingValue,
    closingValue,
  } = loading;

  const isSinglePointLoad = type === loadingEnums.single;
  const isUniformDistributedLoad = type === loadingEnums.uniform;
  const isNonUniformDistributedLoad = type === loadingEnums.varying;

  if (isSinglePointLoad) {
    const left = 100 * (+distanceFromLeft / +length);
    const right = 100 - left;

    return (
      <div className="absolute top-0 left-0 w-full">
        <div className="h-8 relative">
          <div className="h-[0.5px] w-full bg-[#ccc] absolute top-1/2 -translate-y-1/2" />
          <div
            className="flex text-xs not-italic font-normal leading-[133%] h-full
          "
          >
            <p
              className="grow-0 h-full flex items-center justify-center border-x border-[#ccc]"
              style={{ flexBasis: `${left}%` }}
            >
              <span className="bg-white z-10 px-2 text-[#ccc]">
                {+((left * length) / 100)?.toFixed(2)}m
              </span>
            </p>
            <p
              className="grow-0 h-full flex items-center justify-center border-x border-[#ccc]"
              style={{ flexBasis: `${right}%` }}
            >
              <span className="bg-white z-10 px-2 text-[#ccc]">
                {+((right * length) / 100)?.toFixed(2)}m
              </span>
            </p>
          </div>
        </div>
        <div className="relative pt-2 p-0.5 h-[1.5rem]">
          <span
            className="text-secondary text-base not-italic font-normal leading-[133%] absolute -translate-x-1/2 top-0"
            style={{ left: `${left}%` }}
          >
            {(+valueOfLoading)?.toFixed(2)}N/m
          </span>
        </div>
        <div className="relative h-[2rem]">
          <SinglePointLoadIcon
            style={{
              height: "100%",
              position: "absolute",
              left: `${left}%`,
              transform: `translate(-50%, 0)`,
            }}
          />
        </div>
        <div id="beam" className="bg-secondary h-0.5" />
        {flexuralRigidity != "0" && (
          <div className="flex justify-center pt-2 p-0.5">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              ({(+flexuralRigidity)?.toFixed(2)}I)
            </span>
          </div>
        )}
      </div>
    );
  }
  if (isUniformDistributedLoad) {
    const width = 100 * (+spanOfLoading / +length);
    const left = 100 * (+distanceFromLeft / +length);

    return (
      <div className="absolute top-0 left-0 w-full">
        <div className="border-x h-8 border-[#ccc] relative flex items-center justify-center">
          <div className="h-[0.5px] w-full bg-[#ccc] absolute top-1/2 -translate-y-1/2" />
          <p className="bg-white z-10 px-2 text-[#ccc] text-xs not-italic font-normal leading-[133%]">
            {(+length)?.toFixed(2)}m
          </p>
        </div>
        {
          <div className="flex justify-center pt-2 p-0.5">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              {(+valueOfLoading)?.toFixed(2)}N/m
            </span>
          </div>
        }
        <UniformDistributedLoadIcon
          style={{
            height: "2rem",
            width: `${width}%`,
            transform: `translate(${left}%, 0)`,
          }}
        />
        <div id="beam" className="bg-secondary h-0.5" />
        {flexuralRigidity != "0" && (
          <div className="flex justify-center pt-2 p-0.5">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              ({(+flexuralRigidity)?.toFixed(2)}I)
            </span>
          </div>
        )}
      </div>
    );
  }
  if (isNonUniformDistributedLoad) {
    const width = 100 * (+spanOfLoading / +length);
    const left = 100 * (+distanceFromLeft / +length);
    const descending = +openingValue > +closingValue;
    const isTriangular = +openingValue == 0 || +closingValue == 0;

    return (
      <div className="absolute top-0 left-0 w-full">
        <div className="border-x h-8 border-[#ccc] relative flex items-center justify-center">
          <div className="h-[0.5px] w-full bg-[#ccc] absolute top-1/2 -translate-y-1/2" />
          <p className="bg-white z-10 px-2 text-[#ccc] text-xs not-italic font-normal leading-[133%]">
            {(+length)?.toFixed(2)}m
          </p>
        </div>
        <div className="flex justify-between pt-2 p-0.5">
          <span className="text-secondary text-base not-italic font-normal leading-[133%]">
            {(+openingValue)?.toFixed(2)}N/m
          </span>
          <span className="text-secondary text-base not-italic font-normal leading-[133%]">
            {(+closingValue)?.toFixed(2)}N/m
          </span>
        </div>
        <VaryingDistributedLoadIcon
          bigToSmall={descending}
          triangular={isTriangular}
          style={{
            height: "2rem",
            width: `${width}%`,
            transform: `translate(${left}%, 0)`,
          }}
        />
        <div id="beam" className="bg-secondary h-0.5" />
        {flexuralRigidity != "0" && (
          <div className="flex justify-center pt-2 p-0.5">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              ({(+flexuralRigidity)?.toFixed(2)}I)
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
}

BeamDiagram.propTypes = {
  beam: PropTypes.object,
};

function LeftColumn({ column, dim }) {
  const { length, flexuralRigidity, support, loading } = column;
  const {
    type: loadingType,
    distanceFromTop,
    // spanOfLoading,
    valueOfLoading,
    openingValue,
    closingValue,
  } = loading;
  const { type: supportType } = support;
  const {
    leftColumnLength,
    rightColumnLength,
    height,
    topToBeam,
    beamToBottom,
  } = dim;
  const columnFromTopPercent = (topToBeam / height) * 100;
  const largerColumnLength = Math.max(+leftColumnLength, +rightColumnLength);
  const smallerColumnLength = Math.min(+leftColumnLength, +rightColumnLength);
  const columnPercent = (leftColumnLength / largerColumnLength) * beamToBottom;

  const isSinglePointLoad = loadingType === loadingEnums.single;
  const isUniformDistributedLoad = loadingType === loadingEnums.uniform;
  const isNonUniformDistributedLoad = loadingType === loadingEnums.varying;

  const isFixedSupport = supportType === supportEnums?.fixed;
  const isPinnedSupport = supportType === supportEnums?.pinned;
  const isRollerSupport = supportType === supportEnums?.roller;

  if (isSinglePointLoad) {
    const top = 100 * (+distanceFromTop / +length);
    const bottom = 100 - top;
    const loadTop = 100 * (+distanceFromTop / +length);
    return (
      <>
        <div
          className="absolute right-[115%] w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%]"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div
            className="border-y border-y-[#ccc] grow-0 flex items-center justify-center"
            style={{ flexBasis: `${top}%` }}
          >
            <span className="bg-white py-2 z-10">
              {" "}
              {+((top * length) / 100)?.toFixed(2)}m
            </span>
          </div>
          <div
            className="border-y border-y-[#ccc] grow-0 flex items-center justify-center"
            style={{ flexBasis: `${bottom}%` }}
          >
            <span className="bg-white py-2 z-10">
              {+((bottom * length) / 100)?.toFixed(2)}m
            </span>
          </div>
          <div className="absolute w-[0.5px] bg-[#ccc] h-full left-1/2" />
        </div>
        <div
          className="absolute right-full w-[4rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-r-2 border-secondary"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="h-full relative w-full">
            <div
              className="absolute w-full"
              style={{
                top: `${loadTop}%`,
                transform: `translate(0%, -50%)`,
                width: "100%",
              }}
            >
              <HorizontalSinglePointLoad
                toLeft={true}
                style={{ width: "100%" }}
              />
              <span className="absolute top-4 right-2 text-secondary text-base not-italic font-normal leading-[133%]">
                {(+valueOfLoading)?.toFixed(2)}N
              </span>
            </div>
          </div>
          <div className="h-full absolute left-full flex justify-center items-center px-1">
            {+flexuralRigidity > 0 && (
              <span className="text-secondary text-base not-italic font-normal leading-[133%]">
                ({(+flexuralRigidity)?.toFixed(2)})I
              </span>
            )}
          </div>
          <div className="absolute  top-full left-full -translate-x-1/2 w-[2rem] h-[1rem]">
            {isFixedSupport && (
              <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
            )}
            {isPinnedSupport && (
              <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
            {isRollerSupport && (
              <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </div>
      </>
    );
  }

  if (isUniformDistributedLoad) {
    return (
      <>
        <div
          className="absolute right-[125%] w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%]"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="border-y border-y-[#ccc] flex items-center justify-center h-full">
            <span className="bg-white py-2 z-10">{(+length)?.toFixed(2)}m</span>
          </div>
          <div className="absolute w-[0.5px] bg-[#ccc] h-full left-1/2" />
        </div>
        <div
          className="absolute right-full w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-r-2 border-secondary"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="h-full absolute w-full left-0">
            <VerticalUniformDistributedLoadIcon
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="h-full absolute w-full right-[4rem] flex items-center justify-center">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              {(+valueOfLoading)?.toFixed(2)}N
            </span>
          </div>
          <div className="h-full absolute left-full flex justify-center items-center px-1">
            {+flexuralRigidity > 0 && (
              <span className="text-secondary text-base not-italic font-normal leading-[133%]">
                ({(+flexuralRigidity)?.toFixed(2)})I
              </span>
            )}
          </div>
          <div className="absolute  top-full left-full -translate-x-1/2 w-[2rem] h-[1rem]">
            {isFixedSupport && (
              <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
            )}
            {isPinnedSupport && (
              <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
            {isRollerSupport && (
              <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </div>
      </>
    );
  }

  if (isNonUniformDistributedLoad) {
    const isTriangular = +openingValue == 0 || +closingValue == 0;
    const isBigToSmall = +openingValue > +closingValue;

    return (
      <>
        <div
          className="absolute right-[125%] w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%]"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="border-y border-y-[#ccc] flex items-center justify-center h-full">
            <span className="bg-white py-2 z-10">{(+length)?.toFixed(2)}m</span>
          </div>
          <div className="absolute w-[0.5px] bg-[#ccc] h-full left-1/2" />
        </div>
        <div
          className="absolute right-full w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-r-2 border-secondary"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="h-full absolute w-full left-0">
            <VerticalVaryingDistributedLoadIcon
              style={{ height: "100%", width: "100%" }}
              triangular={isTriangular}
              bigToSmall={isBigToSmall}
            />
          </div>
          <div className="h-full absolute w-full right-[5.5rem] flex flex-col justify-between">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              {(+closingValue)?.toFixed(2)}N
            </span>
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              {(+openingValue)?.toFixed(2)}N
            </span>
          </div>
          <div className="h-full absolute left-full flex justify-center items-center px-1">
            {+flexuralRigidity > 0 && (
              <span className="text-secondary text-base not-italic font-normal leading-[133%]">
                ({(+flexuralRigidity)?.toFixed(2)})I
              </span>
            )}
          </div>
          <div className="absolute  top-full left-full -translate-x-1/2 w-[2rem] h-[1rem]">
            {isFixedSupport && (
              <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
            )}
            {isPinnedSupport && (
              <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
            {isRollerSupport && (
              <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="absolute right-[125%] w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%]"
        style={{
          top: `${columnFromTopPercent}%`,
          height: `${columnPercent}px`,
        }}
      >
        <div className="border-y border-y-[#ccc] flex items-center justify-center h-full">
          <span className="bg-white py-2 z-10">{(+length)?.toFixed(2)}m</span>
        </div>
        <div className="absolute w-[0.5px] bg-[#ccc] h-full left-1/2" />
      </div>
      <div
        className="absolute right-full w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-r-2 border-secondary"
        style={{
          top: `${columnFromTopPercent}%`,
          height: `${columnPercent}px`,
        }}
      >
        <div className="absolute  top-full left-full -translate-x-1/2 w-[2rem] h-[1rem]">
          {isFixedSupport && (
            <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
          )}
          {isPinnedSupport && (
            <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
          )}
          {isRollerSupport && (
            <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>
    </>
  );
}

LeftColumn.propTypes = {
  column: PropTypes.object,
  dim: PropTypes.object,
};

function RightColumn({ column, dim }) {
  const { length, flexuralRigidity, support, loading } = column;
  const {
    type: loadingType,
    distanceFromTop,
    // spanOfLoading,
    valueOfLoading,
    openingValue,
    closingValue,
  } = loading;
  const { type: supportType } = support;
  const {
    leftColumnLength,
    rightColumnLength,
    height,
    topToBeam,
    beamToBottom,
  } = dim;
  const columnFromTopPercent = (topToBeam / height) * 100;
  const largerColumnLength = Math.max(+leftColumnLength, +rightColumnLength);
  const smallerColumnLength = Math.min(+leftColumnLength, +rightColumnLength);
  const columnPercent = (rightColumnLength / largerColumnLength) * beamToBottom;

  const isSinglePointLoad = loadingType === loadingEnums.single;
  const isUniformDistributedLoad = loadingType === loadingEnums.uniform;
  const isNonUniformDistributedLoad = loadingType === loadingEnums.varying;

  const isFixedSupport = supportType === supportEnums?.fixed;
  const isPinnedSupport = supportType === supportEnums?.pinned;
  const isRollerSupport = supportType === supportEnums?.roller;

  if (isSinglePointLoad) {
    const top = 100 * (+distanceFromTop / +length);
    const bottom = 100 - top;
    const loadTop = 100 * (+distanceFromTop / +length);
    return (
      <>
        <div
          className="absolute left-[115%] w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%]"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div
            className="border-y border-y-[#ccc] grow-0 flex items-center justify-center"
            style={{ flexBasis: `${top}%` }}
          >
            <span className="bg-white py-2 z-10">
              {" "}
              {+((top * length) / 100)?.toFixed(2)}m
            </span>
          </div>
          <div
            className="border-y border-y-[#ccc] grow-0 flex items-center justify-center"
            style={{ flexBasis: `${bottom}%` }}
          >
            <span className="bg-white py-2 z-10">
              {+((bottom * length) / 100)?.toFixed(2)}m
            </span>
          </div>
          <div className="absolute w-[0.5px] bg-[#ccc] h-full left-1/2" />
        </div>
        <div
          className="absolute left-full w-[4rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-l-2 border-secondary"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="h-full relative w-full">
            <div
              className="absolute w-full"
              style={{
                top: `${loadTop}%`,
                transform: `translate(0%, -50%)`,
                width: "100%",
              }}
            >
              <HorizontalSinglePointLoad
                toLeft={true}
                style={{ width: "100%" }}
                className="rotate-180"
              />
              <span className="absolute top-4 left-2 text-secondary text-base not-italic font-normal leading-[133%]">
                {(+valueOfLoading)?.toFixed(2)}N
              </span>
            </div>
          </div>
          <div className="h-full absolute right-full flex justify-center items-center px-1">
            {+flexuralRigidity > 0 && (
              <span className="text-secondary text-base not-italic font-normal leading-[133%]">
                ({(+flexuralRigidity)?.toFixed(2)})I
              </span>
            )}
          </div>
          <div className="absolute  top-full right-full translate-x-1/2 w-[2rem] h-[1rem]">
            {isFixedSupport && (
              <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
            )}
            {isPinnedSupport && (
              <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
            {isRollerSupport && (
              <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </div>
      </>
    );
  }

  if (isUniformDistributedLoad) {
    return (
      <>
        <div
          className="absolute left-[125%] w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%]"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="border-y border-y-[#ccc] flex items-center justify-center h-full">
            <span className="bg-white py-2 z-10">{(+length)?.toFixed(2)}m</span>
          </div>
          <div className="absolute w-[0.5px] bg-[#ccc] h-full left-1/2" />
        </div>
        <div
          className="absolute left-full w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-l-2 border-secondary"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="h-full absolute w-full left-0">
            <VerticalUniformDistributedLoadIcon
              style={{ height: "100%", width: "100%" }}
              className="rotate-180"
            />
          </div>
          <div className="h-full absolute w-full left-[4rem] flex items-center justify-center">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              {(+valueOfLoading)?.toFixed(2)}N
            </span>
          </div>
          <div className="h-full absolute right-full flex justify-center items-center px-1">
            {+flexuralRigidity > 0 && (
              <span className="text-secondary text-base not-italic font-normal leading-[133%]">
                ({(+flexuralRigidity)?.toFixed(2)})I
              </span>
            )}
          </div>
          <div className="absolute  top-full right-full translate-x-1/2 w-[2rem] h-[1rem]">
            {isFixedSupport && (
              <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
            )}
            {isPinnedSupport && (
              <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
            {isRollerSupport && (
              <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </div>
      </>
    );
  }

  if (isNonUniformDistributedLoad) {
    const isTriangular = +openingValue == 0 || +closingValue == 0;
    const isBigToSmall = +openingValue > +closingValue;

    return (
      <>
        <div
          className="absolute left-[125%] w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%]"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="border-y border-y-[#ccc] flex items-center justify-center h-full">
            <span className="bg-white py-2 z-10">{(+length)?.toFixed(2)}m</span>
          </div>
          <div className="absolute w-[0.5px] bg-[#ccc] h-full left-1/2" />
        </div>
        <div
          className="absolute left-full w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-l-2 border-secondary"
          style={{
            top: `${columnFromTopPercent}%`,
            height: `${columnPercent}px`,
          }}
        >
          <div className="h-full absolute w-full left-0">
            <VerticalVaryingDistributedLoadIcon
              style={{ height: "100%", width: "100%" }}
              triangular={isTriangular}
              bigToSmall={isBigToSmall}
              className="rotate-180"
            />
          </div>
          <div className="h-full absolute w-full left-[5.5rem] flex flex-col justify-between">
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              {(+openingValue)?.toFixed(2)}N
            </span>
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              {(+closingValue)?.toFixed(2)}N
            </span>
          </div>
          <div className="h-full absolute right-full flex justify-center items-center px-1">
            {+flexuralRigidity > 0 && (
              <span className="text-secondary text-base not-italic font-normal leading-[133%]">
                ({(+flexuralRigidity)?.toFixed(2)})I
              </span>
            )}
          </div>
          <div className="absolute  top-full right-full translate-x-1/2 w-[2rem] h-[1rem]">
            {isFixedSupport && (
              <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
            )}
            {isPinnedSupport && (
              <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
            {isRollerSupport && (
              <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="absolute left-full w-[2rem] flex flex-col text-xs text-[#ccc] not-italic font-normal leading-[133%] border-l-2 border-secondary"
        style={{
          top: `${columnFromTopPercent}%`,
          height: `${columnPercent}px`,
        }}
      >
        <div className="h-full absolute right-full flex justify-center items-center px-1">
          {+flexuralRigidity > 0 && (
            <span className="text-secondary text-base not-italic font-normal leading-[133%]">
              ({(+flexuralRigidity)?.toFixed(2)})I
            </span>
          )}
        </div>
        <div className="absolute  top-full right-full translate-x-1/2 w-[2rem] h-[1rem]">
          {isFixedSupport && (
            <FixedSupportUpright style={{ width: "100%", height: "100%" }} />
          )}
          {isPinnedSupport && (
            <PinnedSupportIcon style={{ width: "100%", height: "100%" }} />
          )}
          {isRollerSupport && (
            <RollerSupportIcon style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>
    </>
  );
}

RightColumn.propTypes = {
  column: PropTypes.object,
  dim: PropTypes.object,
};
