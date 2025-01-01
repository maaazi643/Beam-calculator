import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Home from "./pages/home/Home";
import CalculatorLayout from "./pages/beam-calculator/CalculatorLayout";
import QuestionPage from "./pages/beam-calculator/QuestionPage";
import SolutionPage from "./pages/beam-calculator/SolutionPage";
import StepsPage from "./pages/beam-calculator/StepsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="beam-calculator" element={<CalculatorLayout />}>
          <Route index path="question" element={<QuestionPage />} />
          {/* <Route path="steps" element={<StepsPage />} /> */}
          <Route path="solution" element={<SolutionPage />} />
        </Route>
        <Route
          path="frame-calculator"
          element={<NavLink to="/">👀👀👀👀</NavLink>}
        ></Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
