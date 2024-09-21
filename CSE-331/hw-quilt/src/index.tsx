import React from "react";
import { createRoot, Root } from "react-dom/client";
import { Color, PURPLE, GOLD, Quilt } from "./quilt";
import { PatternA, PatternB, PatternC, PatternD } from "./patterns";
import { symmetrize } from "./quilt_ops";
import { QuiltElem } from "./quilt_draw";
import { QuiltForm } from "./quilt_form";

// Returns the pattern number, which must be A-D, or undefined if it was not
// provided or is not in the valid range.
const getPattern = (params: URLSearchParams): string | undefined => {
  if (!params.has("pattern")) return undefined;

  switch (params.get("pattern")) {
    case "A":
      return "A";
    case "B":
      return "B";
    case "C":
      return "C";
    case "D":
      return "D";
    default:
      return undefined;
  }
};

// Returns the color requested or undefined if none was specified.
const getColor = (params: URLSearchParams): Color | undefined => {
  const colorStr = params.get("color");
  if (colorStr === null) {
    return undefined;
  } else {
    const color = colorStr.toLowerCase();
    if (color === "purple") {
      return PURPLE;
    } else if (color === "gold") {
      return GOLD;
    } else {
      return undefined;
    }
  }
};

// Returns the number of rows, which must be a natural number. Defaults to 4.
const getRows = (params: URLSearchParams): bigint => {
  const rowStr = params.get("rows");
  if (rowStr === null) {
    return 4n;
  } else {
    const rows = parseInt(rowStr);
    return !isNaN(rows) ? BigInt(rows) : 4n;
  }
};

// TODO: update getQuilt with new params as necessary

// Returns the quilt with the given pattern.
// Throws an exception if the pattern is not A-D.
const getQuilt = (
  pattern: string,
  rows: bigint,
  color: Color | undefined
): Quilt => {
  switch (pattern) {
    case "A":
      return PatternA(rows, color);
    case "B":
      return PatternB(rows, color);
    case "C":
      return PatternC(rows, color);
    case "D":
      return PatternD(rows, color);
    default:
      throw new Error("impossible");
  }
};

// Parse the arguments to the page, which can indicate the color and number of
// rows in the quilt.
const params: URLSearchParams = new URLSearchParams(window.location.search);
const color: Color | undefined = getColor(params); // TODO: utilize return value for problem 1c
const rows: bigint = getRows(params); // TODO: utilize return value for problem 1e
const sym: boolean = params.has("symmetrize");

// Create a root in which to show the quilt.
const main: HTMLElement | null = document.getElementById("main");
if (main === null) throw new Error("missing main element");
const root: Root = createRoot(main);

// Invoke the function for the pattern given in the query params.
const pattern: string | undefined = getPattern(params);
if (pattern === undefined) {
  root.render(QuiltForm({}));
} else {
  // Display the quilt in the page.

  try {
    // TODO: symmetrize if specified in the query params for problem 4g
    const result = getQuilt(pattern, rows, color);
    if (sym) {
      const symresult = symmetrize(result);
      root.render(
        <React.StrictMode>
          <QuiltElem quilt={symresult} />
        </React.StrictMode>
      );
    } else {
      root.render(
        <React.StrictMode>
          <QuiltElem quilt={result} />
        </React.StrictMode>
      );
    }

    // Note: <QuiltElem> is a custom HTML tag we created to render the quilt
    //   images according to the quilt pattern passed in ('result'). We'll
    //   learn more about these later!
  } catch (e: unknown) {
    if (e instanceof Error) {
      root.render(
        <p>
          <b>Error</b>: {e.message}
        </p>
      );
    } else {
      throw e;
    }
  }
}
