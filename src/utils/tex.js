/**
 * Escapes special characters in a LaTeX formula for use in JSX or HTML.
 * @param {string} tex - The LaTeX formula to escape.
 * @returns {string} - The escaped LaTeX formula.
 */
export function escapeTex(tex) {
  return tex
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/([{}])/g, "\\$1") // Escape braces { and }
    .replace(/\$/g, "\\$"); // Escape dollar signs
}
