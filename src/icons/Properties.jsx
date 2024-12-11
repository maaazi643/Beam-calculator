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
    // width="112"
    // height="47"
    viewBox="0 0 112 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    preserveAspectRatio="none"
    {...props}
  >
    <line
      x1="7.84863"
      y1="1"
      x2="103.849"
      y2="1"
      stroke={COLORS.secondary}
      strokeWidth="2"
    />
    <path
      d="M7.14153 46.7071C7.53205 47.0976 8.16522 47.0976 8.55574 46.7071L14.9197 40.3431C15.3102 39.9526 15.3102 39.3195 14.9197 38.9289C14.5292 38.5384 13.896 38.5384 13.5055 38.9289L7.84863 44.5858L2.19178 38.9289C1.80125 38.5384 1.16809 38.5384 0.777565 38.9289C0.387041 39.3195 0.387041 39.9526 0.777565 40.3431L7.14153 46.7071ZM6.84863 2L6.84863 46H8.84863L8.84863 2H6.84863Z"
      fill={COLORS.secondary}
    />
    <path
      d="M39.1415 46.7071C39.5321 47.0976 40.1652 47.0976 40.5557 46.7071L46.9197 40.3431C47.3102 39.9526 47.3102 39.3195 46.9197 38.9289C46.5292 38.5384 45.896 38.5384 45.5055 38.9289L39.8486 44.5858L34.1918 38.9289C33.8013 38.5384 33.1681 38.5384 32.7776 38.9289C32.387 39.3195 32.387 39.9526 32.7776 40.3431L39.1415 46.7071ZM38.8486 2V46H40.8486V2H38.8486Z"
      fill={COLORS.secondary}
    />
    <path
      d="M71.1415 46.7071C71.5321 47.0976 72.1652 47.0976 72.5557 46.7071L78.9197 40.3431C79.3102 39.9526 79.3102 39.3195 78.9197 38.9289C78.5292 38.5384 77.896 38.5384 77.5055 38.9289L71.8486 44.5858L66.1918 38.9289C65.8013 38.5384 65.1681 38.5384 64.7776 38.9289C64.387 39.3195 64.387 39.9526 64.7776 40.3431L71.1415 46.7071ZM70.8486 2V46H72.8486V2H70.8486Z"
      fill={COLORS.secondary}
    />
    <path
      d="M103.142 46.7071C103.532 47.0976 104.165 47.0976 104.556 46.7071L110.92 40.3431C111.31 39.9526 111.31 39.3195 110.92 38.9289C110.529 38.5384 109.896 38.5384 109.505 38.9289L103.849 44.5858L98.1918 38.9289C97.8013 38.5384 97.1681 38.5384 96.7776 38.9289C96.387 39.3195 96.387 39.9526 96.7776 40.3431L103.142 46.7071ZM102.849 2V46H104.849V2H102.849Z"
      fill={COLORS.secondary}
    />
  </svg>
);

UniformDistributedLoadIcon.propTypes = {
  style: PropTypes.object,
};

export const VaryingDistributedLoadIcon = ({ style, bigToSmall, ...props }) =>
  bigToSmall ? (
    <svg
      width="112"
      height="68"
      viewBox="0 0 112 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      preserveAspectRatio="none"
      {...props}
    >
      <line
        y1="-1"
        x2="100.225"
        y2="-1"
        transform="matrix(-0.977802 -0.209529 -0.209529 0.977802 104.849 23)"
        stroke={COLORS.secondary}
        strokeWidth="2"
      />
      <path
        d="M104.556 67.7071C104.165 68.0976 103.532 68.0976 103.142 67.7071L96.7776 61.3431C96.387 60.9526 96.387 60.3195 96.7776 59.9289C97.1681 59.5384 97.8013 59.5384 98.1918 59.9289L103.849 65.5858L109.505 59.9289C109.896 59.5384 110.529 59.5384 110.92 59.9289C111.31 60.3195 111.31 60.9526 110.92 61.3431L104.556 67.7071ZM104.849 23V67H102.849V23H104.849Z"
        fill={COLORS.secondary}
      />
      <path
        d="M72.5557 67.7071C72.1652 68.0976 71.532 68.0976 71.1415 67.7071L64.7776 61.3431C64.387 60.9526 64.387 60.3195 64.7776 59.9289C65.1681 59.5384 65.8013 59.5384 66.1918 59.9289L71.8486 65.5858L77.5055 59.9289C77.896 59.5384 78.5292 59.5384 78.9197 59.9289C79.3102 60.3195 79.3102 60.9526 78.9197 61.3431L72.5557 67.7071ZM72.8486 15L72.8486 67L70.8486 67L70.8486 15L72.8486 15Z"
        fill={COLORS.secondary}
      />
      <path
        d="M40.5557 67.7071C40.1652 68.0976 39.532 68.0976 39.1415 67.7071L32.7776 61.3431C32.387 60.9526 32.387 60.3195 32.7776 59.9289C33.1681 59.5384 33.8013 59.5384 34.1918 59.9289L39.8486 65.5858L45.5055 59.9289C45.896 59.5384 46.5292 59.5384 46.9197 59.9289C47.3102 60.3195 47.3102 60.9526 46.9197 61.3431L40.5557 67.7071ZM40.8486 8L40.8486 67L38.8486 67L38.8486 8L40.8486 8Z"
        fill={COLORS.secondary}
      />
      <path
        d="M8.55574 67.7071C8.16521 68.0976 7.53205 68.0976 7.14152 67.7071L0.777562 61.3431C0.387038 60.9526 0.387038 60.3195 0.777562 59.9289C1.16809 59.5384 1.80125 59.5384 2.19178 59.9289L7.84863 65.5858L13.5055 59.9289C13.896 59.5384 14.5292 59.5384 14.9197 59.9289C15.3102 60.3195 15.3102 60.9526 14.9197 61.3431L8.55574 67.7071ZM8.84863 2L8.84863 67L6.84863 67L6.84863 2L8.84863 2Z"
        fill={COLORS.secondary}
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 112 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      preserveAspectRatio="none"
      {...props}
    >
      <line
        x1="6.6391"
        y1="22.0222"
        x2="104.639"
        y2="1.0222"
        stroke={COLORS.secondary}
        strokeWidth="2"
      />
      <path
        d="M7.14153 67.7071C7.53205 68.0976 8.16522 68.0976 8.55574 67.7071L14.9197 61.3431C15.3102 60.9526 15.3102 60.3195 14.9197 59.9289C14.5292 59.5384 13.896 59.5384 13.5055 59.9289L7.84863 65.5858L2.19178 59.9289C1.80125 59.5384 1.16809 59.5384 0.777565 59.9289C0.387041 60.3195 0.387041 60.9526 0.777565 61.3431L7.14153 67.7071ZM6.84863 23L6.84863 67H8.84863L8.84863 23H6.84863Z"
        fill={COLORS.secondary}
      />
      <path
        d="M39.1415 67.7071C39.5321 68.0976 40.1652 68.0976 40.5557 67.7071L46.9197 61.3431C47.3102 60.9526 47.3102 60.3195 46.9197 59.9289C46.5292 59.5384 45.896 59.5384 45.5055 59.9289L39.8486 65.5858L34.1918 59.9289C33.8013 59.5384 33.1681 59.5384 32.7776 59.9289C32.387 60.3195 32.387 60.9526 32.7776 61.3431L39.1415 67.7071ZM38.8486 15L38.8486 67L40.8486 67L40.8486 15L38.8486 15Z"
        fill={COLORS.secondary}
      />
      <path
        d="M71.1415 67.7071C71.5321 68.0976 72.1652 68.0976 72.5557 67.7071L78.9197 61.3431C79.3102 60.9526 79.3102 60.3195 78.9197 59.9289C78.5292 59.5384 77.896 59.5384 77.5055 59.9289L71.8486 65.5858L66.1918 59.9289C65.8013 59.5384 65.1681 59.5384 64.7776 59.9289C64.387 60.3195 64.387 60.9526 64.7776 61.3431L71.1415 67.7071ZM70.8486 8L70.8486 67L72.8486 67L72.8486 8L70.8486 8Z"
        fill={COLORS.secondary}
      />
      <path
        d="M103.142 67.7071C103.532 68.0976 104.165 68.0976 104.556 67.7071L110.92 61.3431C111.31 60.9526 111.31 60.3195 110.92 59.9289C110.529 59.5384 109.896 59.5384 109.505 59.9289L103.849 65.5858L98.1918 59.9289C97.8013 59.5384 97.1681 59.5384 96.7776 59.9289C96.387 60.3195 96.387 60.9526 96.7776 61.3431L103.142 67.7071ZM102.849 2L102.849 67L104.849 67L104.849 2L102.849 2Z"
        fill={COLORS.secondary}
      />
    </svg>
  );

VaryingDistributedLoadIcon.propTypes = {
  style: PropTypes.object,
  bigToSmall: PropTypes.bool,
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
