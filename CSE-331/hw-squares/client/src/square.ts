import { List } from "./list";

export type Color =
  | "white"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple";

/**
 * Converts a string to a color (or throws an exception if not a color).
 * @param s string to convert to color
 */
export const toColor = (s: string): Color => {
  switch (s) {
    case "white":
    case "red":
    case "orange":
    case "yellow":
    case "green":
    case "blue":
    case "purple":
      return s;

    default:
      throw new Error(`unknown color "${s}"`);
  }
};

export type Square =
  | { readonly kind: "solid"; readonly color: Color }
  | {
      readonly kind: "split";
      readonly nw: Square;
      readonly ne: Square;
      readonly sw: Square;
      readonly se: Square;
    };

/**
 * Returns a solid square of the given color.
 * @param color of square to return
 * @returns square of given color
 */
export const solid = (color: Color): Square => {
  return { kind: "solid", color: color };
};

/**
 * Returns a square that splits into the four given parts.
 * @param nw square in nw corner of returned square
 * @param ne square in ne corner of returned square
 * @param sw square in sw corner of returned square
 * @param se square in se corner of returned square
 * @returns new square composed of given squares
 */
export const split = (
  nw: Square,
  ne: Square,
  sw: Square,
  se: Square
): Square => {
  return { kind: "split", nw: nw, ne: ne, sw: sw, se: se };
};

export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;

/**
 * Creates a JSON representation of given Square.
 * @param sq to convert to JSON
 * @returns JSON describing the given square
 */
export const toJson = (sq: Square): unknown => {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
};

/**
 * Converts a JSON description to the Square it describes.
 * @param data in JSON form to try to parse as Square
 * @returns a Square parsed from given data
 */
export const fromJson = (data: unknown): Square => {
  if (typeof data === "string") {
    return solid(toColor(data));
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(
        fromJson(data[0]),
        fromJson(data[1]),
        fromJson(data[2]),
        fromJson(data[3])
      );
    } else {
      throw new Error("split must have 4 parts");
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
};

/**
 * Question 1a: retrieve the root of the subtree at that location/path
 * @param p The path to follow.
 * @param T The root square.
 * @returns The root of the subtree at the given path, or undefined if the path is invalid.
 */
export const find = (p: Path, T: Square): Square => {
  if (p.kind === "nil") {
    return T;
  } else if (T.kind === "split") {
    const curDir = p.hd; // current direction to follow
    const L = p.tl; // remaining path

    if (curDir === "NW") {
      return find(L, T.nw);
    } else if (curDir === "NE") {
      return find(L, T.ne);
    } else if (curDir === "SW") {
      return find(L, T.sw);
    } else if (curDir === "SE") {
      return find(L, T.se);
    } else {
      throw new Error("Invalid path or direction");
    }
  } else {
    throw new Error("Invalid path: cannot traverse further");
  }
};

/**
 * Question 1b: Replaces the square at the given path with a new square.
 * @param p The path to follow.
 * @param T The root square.
 * @param newSquare The new square to replace the existing one.
 * @returns A new square that is the same as the first one except that the subtree whose root is at the given path is replaced by the second square
 */
export const replace = (p: Path, T: Square, newSquare: Square): Square => {
  if (p.kind === "nil") {
    return newSquare;
  } else if (T.kind === "split") {
    const curDir = p.hd; // current direction to follow
    const L = p.tl; // remaining path

    if (curDir === "NW") {
      return split(replace(L, T.nw, newSquare), T.ne, T.sw, T.se);
    } else if (curDir === "NE") {
      return split(T.nw, replace(L, T.ne, newSquare), T.sw, T.se);
    } else if (curDir === "SW") {
      return split(T.nw, T.ne, replace(L, T.sw, newSquare), T.se);
    } else if (curDir === "SE") {
      return split(T.nw, T.ne, T.sw, replace(L, T.se, newSquare));
    } else {
      throw new Error("Invalid path or direction");
    }
  } else {
    throw new Error("Path leads to a non-existent subtree.");
  }
};
