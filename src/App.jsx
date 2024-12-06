import { BrowserRouter, Routes, Route } from "react-router";
import CalculatorLayout from "./pages/beam-calculator/CalculatorLayout";
import QuestionPage from "./pages/beam-calculator/QuestionPage";
import SolutionPage from "./pages/beam-calculator/SolutionPage";
import StepsPage from "./pages/beam-calculator/StepsPage";

function App() {

  return (
    <BrowserRouter>
        <Routes key={location.pathname}>
          <Route path="beam-calculator" element={<CalculatorLayout />}>
            <Route index path="question" element={<QuestionPage />} />
            <Route path="steps" element={<StepsPage />} />
            <Route path="solution" element={<SolutionPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
