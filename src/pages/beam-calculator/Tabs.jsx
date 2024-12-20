import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation, useNavigate } from "react-router";

function Tab({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-secondary font-semibold text-lg"
            : "text-secondary-2 font-normal text-base"
        } not-italic leading-[133%] font-inter transition-all duration-200 ease-in-out hover:text-secondary hover:font-semibold`
      }
    >
      {children}
    </NavLink>
  );
}

Tab.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const endsWithQuestion = pathname.endsWith("question");
  const endsWithSteps = pathname.endsWith("steps");
  const endsWithSolution = pathname.endsWith("solution");

  useEffect(() => {
    if (!endsWithQuestion && !endsWithSteps && !endsWithSolution) {
      navigate("question");
    }
  }, [navigate, endsWithQuestion, endsWithSteps, endsWithSolution]);

  return (
    <div className="pb-3 border-b border-b-secondary flex items-center gap-x-6">
      <Tab to="question">Question</Tab>
      <Tab to="steps">Steps</Tab>
      <Tab to="solution">Solution</Tab>
    </div>
  );
}
