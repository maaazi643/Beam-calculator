import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { COLORS } from "../../tailwind.config";
import { twMerge } from "tailwind-merge";

export const SinglePointLoadButton = ({ active, onClick }) => {
  return (
    <motion.button
      className="p-[0.7rem] rounded-lg inline-flex items-center justify-center"
      onClick={onClick}
      animate={{
        backgroundColor: active ? "#444" : "#fff", // bg-secondary / bg-primary
        // scale: active ? 1.1 : 1, // Slight scaling effect
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.span
        className="flex w-[2.1rem] h-[2.1rem] justify-center items-center px-0 py-[0.40831rem]"
        initial={{ rotate: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="22"
          viewBox="0 0 7 22"
          fill="none"
        >
          <motion.path
            d="M3.17002 21.5967C3.35226 21.7789 3.64774 21.7789 3.82998 21.5967L6.79983 18.6268C6.98208 18.4446 6.98208 18.1491 6.79983 17.9668C6.61759 17.7846 6.32211 17.7846 6.13986 17.9668L3.5 20.6067L0.860135 17.9668C0.677891 17.7846 0.382414 17.7846 0.200169 17.9668C0.0179243 18.1491 0.0179243 18.4446 0.200169 18.6268L3.17002 21.5967ZM3.03333 0.733337L3.03333 21.2667H3.96667L3.96667 0.733337H3.03333Z"
            animate={{
              fill: active ? "#fff" : "#444", // Path color transitions
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </motion.span>
    </motion.button>
  );
};

SinglePointLoadButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const UniformDistributedLoadButton = ({ active, onClick }) => {
  return (
    <motion.button
      className="p-[0.7rem] rounded-lg inline-flex items-center justify-center"
      onClick={onClick}
      animate={{
        backgroundColor: active ? "#444" : "#fff", // Change background color
        // scale: active ? 1.1 : 1, // Slight scaling effect
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="23"
        viewBox="0 0 30 23"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          // rotate: active ? 180 : 0, // Rotate when active
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.line
          x1="3.80017"
          y1="1.26667"
          x2="26.2002"
          y2="1.26667"
          stroke={active ? "#fff" : "#444"} // Stroke color transition
          strokeWidth="0.933333"
          animate={{
            strokeWidth: active ? 1.5 : 0.933333, // Animate stroke width
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M3.47019 22.5967C3.65243 22.7789 3.94791 22.7789 4.13015 22.5967L7.1 19.6268C7.28225 19.4446 7.28225 19.1491 7.1 18.9668C6.91776 18.7846 6.62228 18.7846 6.44004 18.9668L3.80017 21.6067L1.16031 18.9668C0.978061 18.7846 0.682585 18.7846 0.50034 18.9668C0.318095 19.1491 0.318095 19.4446 0.50034 19.6268L3.47019 22.5967ZM3.3335 1.73334L3.3335 22.2667H4.26684L4.26684 1.73334H3.3335Z"
          fill={active ? "#fff" : "#444"} // Fill color transition
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M14.6702 22.5967C14.8524 22.7789 15.1479 22.7789 15.3302 22.5967L18.3 19.6268C18.4823 19.4446 18.4823 19.1491 18.3 18.9668C18.1178 18.7846 17.8223 18.7846 17.64 18.9668L15.0002 21.6067L12.3603 18.9668C12.1781 18.7846 11.8826 18.7846 11.7004 18.9668C11.5181 19.1491 11.5181 19.4446 11.7004 19.6268L14.6702 22.5967ZM14.5335 1.73334L14.5335 22.2667H15.4668L15.4668 1.73334H14.5335Z"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M25.8702 22.5967C26.0525 22.7789 26.3479 22.7789 26.5302 22.5967L29.5 19.6268C29.6823 19.4446 29.6823 19.1491 29.5 18.9668C29.3178 18.7846 29.0223 18.7846 28.8401 18.9668L26.2002 21.6067L23.5603 18.9668C23.3781 18.7846 23.0826 18.7846 22.9004 18.9668C22.7181 19.1491 22.7181 19.4446 22.9004 19.6268L25.8702 22.5967ZM25.7335 1.73334V22.2667H26.6669V1.73334H25.7335Z"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.button>
  );
};

UniformDistributedLoadButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const UniformVaryingLoadButton = ({ active, onClick }) => {
  return (
    <motion.button
      className="p-[0.7rem] rounded-lg inline-flex items-center justify-center"
      onClick={onClick}
      animate={{
        backgroundColor: active ? "#444" : "#fff", // Button background color
        // scale: active ? 1.1 : 1, // Scale button on activation
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="22"
        viewBox="0 0 30 22"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          // rotate: active ? 180 : 0, // Rotate SVG 180° when active
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.line
          x1="3.85314"
          y1="13.112"
          x2="26.5331"
          y2="0.512017"
          stroke={active ? "#fff" : "#444"} // Animate stroke color
          strokeWidth="0.933333"
          animate={{
            strokeWidth: active ? 1.5 : 0.933333, // Animate stroke width
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M3.74979 21.4099C3.93203 21.5921 4.22751 21.5921 4.40976 21.4099L7.3796 18.44C7.56185 18.2578 7.56185 17.9623 7.3796 17.78C7.19736 17.5978 6.90188 17.5978 6.71964 17.78L4.07977 20.4199L1.43991 17.78C1.25766 17.5978 0.962187 17.5978 0.779942 17.78C0.597698 17.9623 0.597698 18.2578 0.779942 18.44L3.74979 21.4099ZM3.61311 12.6799L3.61311 21.0799L4.54644 21.0799L4.54644 12.6799L3.61311 12.6799Z"
          fill={active ? "#fff" : "#444"} // Animate fill color
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M14.6698 21.4099C14.8521 21.5922 15.1476 21.5922 15.3298 21.4099L18.2996 18.4401C18.4819 18.2578 18.4819 17.9623 18.2996 17.7801C18.1174 17.5979 17.8219 17.5979 17.6397 17.7801L14.9998 20.42L12.36 17.7801C12.1777 17.5979 11.8822 17.5979 11.7 17.7801C11.5177 17.9623 11.5177 18.2578 11.7 18.4401L14.6698 21.4099ZM14.5332 6.79993L14.5332 21.0799L15.4665 21.0799L15.4665 6.79993L14.5332 6.79993Z"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M25.8697 21.5966C26.0519 21.7788 26.3474 21.7788 26.5296 21.5966L29.4995 18.6267C29.6817 18.4445 29.6817 18.149 29.4995 17.9668C29.3172 17.7845 29.0218 17.7845 28.8395 17.9668L26.1996 20.6066L23.5598 17.9668C23.3775 17.7845 23.0821 17.7845 22.8998 17.9668C22.7176 18.149 22.7176 18.4445 22.8998 18.6267L25.8697 21.5966ZM25.733 0.733276V21.2666H26.6663V0.733276H25.733Z"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.button>
  );
};

UniformVaryingLoadButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const PinnedSupportButton = ({ active, onClick }) => {
  return (
    <motion.button
      className="p-[0.7rem] rounded-lg inline-flex items-center justify-center"
      onClick={onClick}
      animate={{
        backgroundColor: active ? "#444" : "#fff", // Button background color
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.path
          d="M14.4201 0.699997L25.9382 20.65H2.90192L14.4201 0.699997Z"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        {[17.8353, 13.3764, 8.91766, 4.45874, 0].map((x, i) => (
          <motion.line
            key={i}
            y1="-0.309196"
            x2="7.49229"
            y2="-0.309196"
            transform={`matrix(0.758752 -0.65138 -0.634148 -0.773212 ${x} 25.2)`}
            stroke={active ? "#fff" : "#444"}
            strokeWidth="0.618392"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </motion.button>
  );
};

PinnedSupportButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const RollerSupportButton = ({ active, onClick }) => {
  return (
    <motion.button
      className="p-[0.7rem] rounded-lg inline-flex items-center justify-center"
      onClick={onClick}
      animate={{
        backgroundColor: active ? "#444" : "#fff", // Button background color
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.path
          d="M14 0.699997L25.5182 20.65H2.48187L14 0.699997Z"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="6.22996"
          cy="23.45"
          r="3.15"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="20.9299"
          cy="23.45"
          r="3.15"
          fill={active ? "#fff" : "#444"}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.button>
  );
};

RollerSupportButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const FixedSupportButton = ({ active, onClick }) => {
  return (
    <motion.button
      className="p-[0.7rem] rounded-lg inline-flex items-center justify-center"
      onClick={onClick}
      animate={{
        backgroundColor: active ? "#444" : "#fff", // Button background color
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.line
          x1="14.9454"
          y1="14.6688"
          x2="26.1454"
          y2="14.6688"
          stroke={active ? "#fff" : "#444"}
          strokeWidth="1.24444"
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M15.0394 2.68896L15.0394 25.089"
          stroke={active ? "#fff" : "#444"}
          strokeWidth="1.24444"
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
        {[10.0164, 15.4954, 20.9744, 26.4538, 31.9331].map((y, i) => (
          <motion.line
            key={i}
            y1="-0.311111"
            x2="9.64934"
            y2="-0.311111"
            transform={`matrix(0.689851 -0.723952 0.804268 0.594267 8.19513 ${y})`}
            stroke={active ? "#fff" : "#444"}
            strokeWidth="0.622222"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </motion.button>
  );
};

FixedSupportButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const BeamIcon = ({ className, setBeamPixelLength }) => {
  const beamRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (beamRef.current) {
        setBeamPixelLength(beamRef.current.offsetWidth); // Width in pixels
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setBeamPixelLength]);

  return (
    <div
      ref={beamRef}
      className={twMerge("w-full bg-secondary h-0.5", className)}
    />
  );
};

BeamIcon.propTypes = {
  className: PropTypes.string,
  setBeamPixelLength: PropTypes.func,
};

export const SinglePointLoadIcon = ({ style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="16"
    // height="45"
    viewBox="0 0 16 45"
    fill="none"
    style={style}
    preserveAspectRatio="none"
    {...props}
  >
    <path
      d="M7.14153 44.7071C7.53205 45.0976 8.16522 45.0976 8.55574 44.7071L14.9197 38.3431C15.3102 37.9526 15.3102 37.3195 14.9197 36.9289C14.5292 36.5384 13.896 36.5384 13.5055 36.9289L7.84863 42.5858L2.19178 36.9289C1.80125 36.5384 1.16809 36.5384 0.777565 36.9289C0.387041 37.3195 0.387041 37.9526 0.777565 38.3431L7.14153 44.7071ZM6.84863 0L6.84863 44H8.84863L8.84863 0L6.84863 0Z"
      fill={COLORS.secondary}
    />
  </svg>
);

SinglePointLoadIcon.propTypes = {
  style: PropTypes.object,
};

export const UniformDistributedLoadIcon = ({ style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 61 44"
    fill="none"
    style={style}
    {...props}
  >
    <path
      d="M1 1.30371H59.5"
      stroke="black"
      strokeWidth="1.39286"
      strokeLinecap="round"
    />
    <path
      d="M1 2V42.8572L7.96429 35.5612"
      stroke="black"
      strokeWidth="1.39286"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.9464 2C30.9464 1.61537 30.6346 1.30357 30.25 1.30357C29.8654 1.30357 29.5536 1.61537 29.5536 2H30.9464ZM29.7576 43.3496C30.0295 43.6216 30.4705 43.6216 30.7424 43.3496L35.1745 38.9176C35.4465 38.6456 35.4465 38.2046 35.1745 37.9327C34.9025 37.6607 34.4616 37.6607 34.1896 37.9327L30.25 41.8723L26.3104 37.9327C26.0384 37.6607 25.5975 37.6607 25.3255 37.9327C25.0535 38.2046 25.0535 38.6456 25.3255 38.9176L29.7576 43.3496ZM29.5536 2L29.5536 42.8572H30.9464L30.9464 2H29.5536Z"
      fill="black"
    />
    <path
      d="M59.5 2V42.8572L52.5357 35.5612"
      stroke="black"
      strokeWidth="1.39286"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

UniformDistributedLoadIcon.propTypes = {
  style: PropTypes.object,
};

export const VaryingDistributedLoadIcon = ({ style, bigToSmall, triangular, ...props }) => {
  if(triangular && bigToSmall) {
    return (
      <svg
        viewBox="0 0 98 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        preserveAspectRatio="none"
        {...props}
      >
        <path
          d="M97 65L0.999998 1"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M65.495 66.495C65.2216 66.7683 64.7784 66.7683 64.505 66.495L60.0503 62.0402C59.7769 61.7668 59.7769 61.3236 60.0503 61.0503C60.3236 60.7769 60.7668 60.7769 61.0402 61.0503L65 65.0101L68.9598 61.0503C69.2332 60.7769 69.6764 60.7769 69.9497 61.0503C70.2231 61.3236 70.2231 61.7668 69.9497 62.0402L65.495 66.495ZM65.7 44L65.7 66L64.3 66L64.3 44L65.7 44Z"
          fill="black"
        />
        <path
          d="M33.495 66.495C33.2216 66.7683 32.7784 66.7683 32.505 66.495L28.0503 62.0402C27.7769 61.7668 27.7769 61.3236 28.0503 61.0503C28.3236 60.7769 28.7668 60.7769 29.0402 61.0503L33 65.0101L36.9598 61.0503C37.2332 60.7769 37.6764 60.7769 37.9497 61.0503C38.2231 61.3236 38.2231 61.7668 37.9497 62.0402L33.495 66.495ZM33.7 22L33.7 66L32.3 66L32.3 22L33.7 22Z"
          fill="black"
        />
        <path
          d="M1 1V65L8 57.6718"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if(triangular && !bigToSmall) {
    return (
      <svg
        viewBox="0 0 98 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        preserveAspectRatio="none"
        {...props}
      >
        <path
          d="M1 65L97 1"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M32.505 66.495C32.7784 66.7683 33.2216 66.7683 33.495 66.495L37.9497 62.0402C38.2231 61.7668 38.2231 61.3236 37.9497 61.0503C37.6764 60.7769 37.2332 60.7769 36.9598 61.0503L33 65.0101L29.0402 61.0503C28.7668 60.7769 28.3236 60.7769 28.0503 61.0503C27.7769 61.3236 27.7769 61.7668 28.0503 62.0402L32.505 66.495ZM32.3 44L32.3 66L33.7 66L33.7 44L32.3 44Z"
          fill="black"
        />
        <path
          d="M64.505 66.495C64.7784 66.7683 65.2216 66.7683 65.495 66.495L69.9497 62.0402C70.2231 61.7668 70.2231 61.3236 69.9497 61.0503C69.6764 60.7769 69.2332 60.7769 68.9598 61.0503L65 65.0101L61.0402 61.0503C60.7668 60.7769 60.3236 60.7769 60.0503 61.0503C59.7769 61.3236 59.7769 61.7668 60.0503 62.0402L64.505 66.495ZM64.3 22L64.3 66L65.7 66L65.7 22L64.3 22Z"
          fill="black"
        />
        <path
          d="M97 1V65L90 57.6718"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if(!triangular && bigToSmall){
    return (
      <svg
        viewBox="0 0 98 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        preserveAspectRatio="none"
        {...props}
      >
        <path
          d="M97 21L0.999995 0.999999"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M97 21V66L90 57.9643"
          stroke="black"
          strokeWidth="1.39286"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M65.495 66.495C65.2216 66.7683 64.7784 66.7683 64.505 66.495L60.0503 62.0402C59.7769 61.7668 59.7769 61.3236 60.0503 61.0503C60.3236 60.7769 60.7668 60.7769 61.0402 61.0503L65 65.0101L68.9598 61.0503C69.2332 60.7769 69.6764 60.7769 69.9497 61.0503C70.2231 61.3236 70.2231 61.7668 69.9497 62.0402L65.495 66.495ZM65.7 14L65.7 66L64.3 66L64.3 14L65.7 14Z"
          fill="black"
        />
        <path
          d="M33.495 66.495C33.2216 66.7683 32.7784 66.7683 32.505 66.495L28.0503 62.0402C27.7769 61.7668 27.7769 61.3236 28.0503 61.0502C28.3236 60.7769 28.7668 60.7769 29.0402 61.0502L33 65.01L36.9598 61.0502C37.2332 60.7769 37.6764 60.7769 37.9497 61.0502C38.2231 61.3236 38.2231 61.7668 37.9497 62.0402L33.495 66.495ZM33.7 7L33.7 66L32.3 66L32.3 7L33.7 7Z"
          fill="black"
        />
        <path
          d="M1 1V65L8 57.6718"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if(!triangular && !bigToSmall) {
    return (
      <svg
        viewBox="0 0 98 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        preserveAspectRatio="none"
        {...props}
      >
        <path
          d="M1 21L97 0.999999"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M1 21V66L8 57.9643"
          stroke="black"
          strokeWidth="1.39286"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.505 66.495C32.7784 66.7683 33.2216 66.7683 33.495 66.495L37.9497 62.0402C38.2231 61.7668 38.2231 61.3236 37.9497 61.0503C37.6764 60.7769 37.2332 60.7769 36.9598 61.0503L33 65.0101L29.0402 61.0503C28.7668 60.7769 28.3236 60.7769 28.0503 61.0503C27.7769 61.3236 27.7769 61.7668 28.0503 62.0402L32.505 66.495ZM32.3 14L32.3 66L33.7 66L33.7 14L32.3 14Z"
          fill="black"
        />
        <path
          d="M64.505 66.495C64.7784 66.7683 65.2216 66.7683 65.495 66.495L69.9497 62.0402C70.2231 61.7668 70.2231 61.3236 69.9497 61.0502C69.6764 60.7769 69.2332 60.7769 68.9598 61.0502L65 65.01L61.0402 61.0502C60.7668 60.7769 60.3236 60.7769 60.0503 61.0502C59.7769 61.3236 59.7769 61.7668 60.0503 62.0402L64.505 66.495ZM64.3 7L64.3 66L65.7 66L65.7 7L64.3 7Z"
          fill="black"
        />
        <path
          d="M97 1V65L90 57.6718"
          stroke="black"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null
}


VaryingDistributedLoadIcon.propTypes = {
  style: PropTypes.object,
  bigToSmall: PropTypes.bool,
  triangular: PropTypes.bool,
};

export const PinnedSupportIcon = ({ style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="41"
    height="38"
    viewBox="0 0 41 38"
    fill="none"
    style={style}
    {...props}
  >
    <path
      d="M21.4487 0L37.9032 28.5H4.99425L21.4487 0Z"
      fill={COLORS.secondary}
    />
    <line
      y1="-0.441709"
      x2="10.7033"
      y2="-0.441709"
      transform="matrix(0.758752 -0.65138 -0.634148 -0.773212 26.3276 35)"
      stroke={COLORS.secondary}
      strokeWidth="0.883417"
    />
    <line
      y1="-0.441709"
      x2="10.7033"
      y2="-0.441709"
      transform="matrix(0.758752 -0.65138 -0.634148 -0.773212 19.9578 35)"
      stroke={COLORS.secondary}
      strokeWidth="0.883417"
    />
    <line
      y1="-0.441709"
      x2="10.7033"
      y2="-0.441709"
      transform="matrix(0.758752 -0.65138 -0.634148 -0.773212 13.5881 35)"
      stroke={COLORS.secondary}
      strokeWidth="0.883417"
    />
    <line
      y1="-0.441709"
      x2="10.7033"
      y2="-0.441709"
      transform="matrix(0.758752 -0.65138 -0.634148 -0.773212 7.21826 35)"
      stroke={COLORS.secondary}
      strokeWidth="0.883417"
    />
    <line
      y1="-0.441709"
      x2="10.7033"
      y2="-0.441709"
      transform="matrix(0.758752 -0.65138 -0.634148 -0.773212 0.848633 35)"
      stroke={COLORS.secondary}
      strokeWidth="0.883417"
    />
  </svg>
);

PinnedSupportIcon.propTypes = {
  style: PropTypes.object,
};

export const RollerSupportIcon = ({ style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="39"
    height="38"
    viewBox="0 0 39 38"
    fill="none"
    style={style}
    {...props}
  >
    <path
      d="M19.8486 0L36.3031 28.5H3.39415L19.8486 0Z"
      fill={COLORS.secondary}
    />
    <circle cx="8.74854" cy="32.5" r="4.5" fill={COLORS.secondary} />
    <circle cx="29.7485" cy="32.5" r="4.5" fill={COLORS.secondary} />
  </svg>
);

RollerSupportIcon.propTypes = {
  style: PropTypes.object,
};

export const FixedSupportIcon = ({ style, atStart, ...props }) =>
  atStart ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="55"
      viewBox="0 0 13 55"
      fill="none"
      style={style}
      {...props}
    >
      <path
        d="M11.8489 1L11.8489 42"
        stroke={COLORS.secondary}
        strokeWidth="2"
      />
      <line
        x1="0.616978"
        y1="14.0526"
        x2="11.3151"
        y2="1.30311"
        stroke={COLORS.secondary}
      />
      <line
        x1="0.616978"
        y1="24.0526"
        x2="11.3151"
        y2="11.3031"
        stroke={COLORS.secondary}
      />
      <line
        x1="0.616978"
        y1="34.0526"
        x2="11.3151"
        y2="21.3031"
        stroke={COLORS.secondary}
      />
      <line
        x1="0.616978"
        y1="44.0526"
        x2="11.3151"
        y2="31.3031"
        stroke={COLORS.secondary}
      />
      <line
        x1="0.616978"
        y1="54.0526"
        x2="11.3151"
        y2="41.3031"
        stroke={COLORS.secondary}
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="54"
      viewBox="0 0 13 54"
      fill="none"
      style={style}
      {...props}
    >
      <path
        d="M0.999756 53.374L0.999758 12.374"
        stroke="#444444"
        strokeWidth="2"
      />
      <line
        x1="12.2317"
        y1="40.3214"
        x2="1.53354"
        y2="53.0709"
        stroke={COLORS.secondary}
      />
      <line
        x1="12.2317"
        y1="30.3214"
        x2="1.53354"
        y2="43.0709"
        stroke={COLORS.secondary}
      />
      <line
        x1="12.2317"
        y1="20.3214"
        x2="1.53354"
        y2="33.0709"
        stroke={COLORS.secondary}
      />
      <line
        x1="12.2317"
        y1="10.3214"
        x2="1.53354"
        y2="23.0709"
        stroke={COLORS.secondary}
      />
      <line
        x1="12.2317"
        y1="0.321394"
        x2="1.53354"
        y2="13.0709"
        stroke={COLORS.secondary}
      />
    </svg>
  );

FixedSupportIcon.propTypes = {
  style: PropTypes.object,
  atStart: PropTypes.bool,
};

export const Mark = ({ style, mark, ...props }) => (
  <div className="border-x absolute h-[12%]" style={style} {...props}>
    <div className="w-full h-full relative text-[#ccc] text-xs not-italic font-normal leading-[133%]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#ccc] w-full" />
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2">
        {mark?.spacingInUnit}m
      </div>
    </div>
  </div>
);

Mark.propTypes = {
  style: PropTypes.object.isRequired,
  mark: PropTypes.object.isRequired,
};
