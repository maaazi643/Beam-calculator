import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function DeleteButton({ children, onClick, ...props }) {
  return (
    <button
      className={twMerge(
        "bg-red-900 w-full flex justify-center items-center gap-2 rounded text-error text-center text-sm not-italic font-semibold leading-[133%] px-4 py-[0.6875rem] transition-all duration-200 ease-in-out transform active:scale-95 focus:outline-none group"
      )}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

DeleteButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
