import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function SolveButton({ children, onClick, ...props }) {
  return (
    <button
      className={twMerge(
        "bg-[#F0E68C] text-xl w-full flex justify-center items-center rounded-lg text-black text-center  not-italic font-semibold leading-[133%] px-4 py-[.9rem] transition-all duration-200 ease-in-out transform active:scale-95 outline-none "
      )}
      onClick={onClick}
      type="submit"
      {...props}
    >
      {children || "Solve"}
    </button>
  );
}

SolveButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
