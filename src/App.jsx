import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import CalculatorLayout from "./pages/beam-calculator/CalculatorLayout";
import QuestionPage from "./pages/beam-calculator/QuestionPage";
import SolutionPage from "./pages/beam-calculator/SolutionPage";
import TestPage from "./pages/beam-calculator/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="test" element={<TestPage />} />
        <Route path="beam-calculator" element={<CalculatorLayout />}>
          <Route index path="question" element={<QuestionPage />} />
          <Route path="solution" element={<SolutionPage />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
