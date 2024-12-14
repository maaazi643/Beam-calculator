import { getBeamAnalysis } from "../../store/beam-fem";
import { useDispatch, useSelector } from "react-redux";
import { MathJaxProvider, MathJaxFormula } from "mathjax3-react";
import { MathJax } from "better-react-mathjax";
import { escapeTex } from "../../utils/tex";
import { v4 as uuidv4 } from "uuid";

export default function SolutionPage() {
  const dispatch = useDispatch();
  const { beamProperties } = useSelector((state) => state.beam);
  const analysis = getBeamAnalysis(beamProperties);

  console.log(beamProperties);
  console.log(analysis);

  return (
    <>
      <MathJax style={{ textAlign: "left", border: "1px solid red" }}>
        {"$$M_{F1.2} = \\frac{20 \\cdot 4}{8}$$"}
        {"$$M_{F1.2} = -\\frac{20 \\cdot 4}{8}$$"}
        {"$$M_{F1.2} = -\\frac{20 \\cdot 4}{8}$$"}
      </MathJax>
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-700">
            <th></th>
            {analysis?.fixedEndedMoments?.map((el, ind) => (
              <>
                <th
                  key={el?.lr?.name + ind}
                  className="px-4 py-2 border border-gray-300 font-semibold"
                >
                  {el?.lr?.name}
                </th>
                <th
                  key={el?.rl?.name + ind}
                  className="px-4 py-2 border border-gray-300 font-semibold"
                >
                  {el?.rl?.name}
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-100 odd:bg-white text-gray-800">
            <td>Fixed End Moments</td>
            {analysis?.fixedEndedMoments?.map((el, ind) => (
              <>
                <td
                  key={el?.lr?.name + ind}
                  className="px-4 py-2 border border-gray-300"
                >
                  {el?.lr?.fem}
                </td>
                <td
                  key={el?.rl?.name + ind}
                  className="px-4 py-2 border border-gray-300"
                >
                  {el?.rl?.fem}
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
