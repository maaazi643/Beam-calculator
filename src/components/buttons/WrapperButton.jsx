import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function WrapperButton({ children, onClick, ...props }) {
  return (
    <button
      className={twMerge(
        "bg-primary w-full flex justify-center items-center gap-2 rounded text-black text-center text-sm not-italic font-semibold leading-[133%] px-4 py-[0.6875rem] transition-all duration-200 ease-in-out transform active:scale-95 hover:bg-black hover:text-primary focus:outline-none group"
      )}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

WrapperButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
