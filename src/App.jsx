import { BrowserRouter, Routes, Route } from "react-router";
import CalculatorLayout from "./pages/calculator/CalculatorLayout";
import QuestionPage from "./pages/calculator/QuestionPage";
import SolutionPage from "./pages/calculator/SolutionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="calculator" element={<CalculatorLayout />}>
          <Route index path="question" element={<QuestionPage />} />
          <Route path="solution" element={<SolutionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
