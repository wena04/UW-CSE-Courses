import { Color, Block, Row, rnil, rcons, Quilt, qnil, qcons } from "./quilt";

/** Returns a quilt of pattern "A". */
export const PatternA = (rows: bigint, color?: Color): Quilt => {
  if (rows < 0n) throw new Error("Rows must be a non-negative number");
  if (rows === 0n) return qnil;
  if (color === undefined) {
    const blockA: Block = { design: "ROUND", color: "PURPLE", corner: "NE" };
    const rowA: Row = rcons(blockA, rcons(blockA, rnil));
    const QuiltA: Quilt = qcons(rowA, PatternA(rows - 1n, color));
    return QuiltA;
  } else {
    const blockA: Block = { design: "ROUND", color: color, corner: "NE" };
    const rowA: Row = rcons(blockA, rcons(blockA, rnil));
    const QuiltA: Quilt = qcons(rowA, PatternA(rows - 1n, color));
    return QuiltA;
  }
};

/** Returns a quilt of pattern "B". */
export const PatternB = (rows: bigint, color?: Color): Quilt => {
  if (rows < 0n) throw new Error("Rows must be a non-negative number");
  if (rows === 0n) return qnil;
  if (color === undefined) {
    const blockB1: Block = {
      design: "STRAIGHT",
      color: "PURPLE",
      corner: "NE",
    };
    const blockB2: Block = {
      design: "STRAIGHT",
      color: "PURPLE",
      corner: "NW",
    };
    const rowB: Row = rcons(blockB1, rcons(blockB2, rnil));
    const QuiltB: Quilt = qcons(rowB, PatternB(rows - 1n, color));
    return QuiltB;
  } else {
    const blockB1: Block = {
      design: "STRAIGHT",
      color: color,
      corner: "NE",
    };
    const blockB2: Block = {
      design: "STRAIGHT",
      color: color,
      corner: "NW",
    };
    const rowB: Row = rcons(blockB1, rcons(blockB2, rnil));
    const QuiltB: Quilt = qcons(rowB, PatternB(rows - 1n, color));
    return QuiltB;
  }
};

/** Returns a quilt of pattern "C". */
export const PatternC = (rows: bigint, color?: Color): Quilt => {
  if (rows < 0n) throw new Error("Rows must be a non-negative number");
  if (rows % 2n !== 0n)
    throw new Error("PatternC is only defined for even numbers of rows");
  if (rows === 0n) return qnil;
  if (color === undefined) {
    const blockc1: Block = { design: "ROUND", color: "PURPLE", corner: "SE" };
    const blockc2: Block = { design: "ROUND", color: "PURPLE", corner: "SW" };
    const blockc3: Block = { design: "ROUND", color: "PURPLE", corner: "NE" };
    const blockc4: Block = { design: "ROUND", color: "PURPLE", corner: "NW" };
    const rowc1: Row = rcons(blockc1, rcons(blockc2, rnil));
    const rowc2: Row = rcons(blockc3, rcons(blockc4, rnil));
    const QuiltC: Quilt = qcons(
      rowc1,
      qcons(rowc2, PatternC(rows - 2n, color))
    );
    return QuiltC;
  } else {
    const blockc1: Block = { design: "ROUND", color: color, corner: "SE" };
    const blockc2: Block = { design: "ROUND", color: color, corner: "SW" };
    const blockc3: Block = { design: "ROUND", color: color, corner: "NE" };
    const blockc4: Block = { design: "ROUND", color: color, corner: "NW" };
    const rowc1: Row = rcons(blockc1, rcons(blockc2, rnil));
    const rowc2: Row = rcons(blockc3, rcons(blockc4, rnil));
    const QuiltC: Quilt = qcons(
      rowc1,
      qcons(rowc2, PatternC(rows - 2n, color))
    );
    return QuiltC;
  }
};

/** Returns a quilt of pattern "D". */
export const PatternD = (rows: bigint, color?: Color): Quilt => {
  if (rows < 0n) throw new Error("Rows must be a non-negative number");
  if (rows % 2n !== 0n)
    throw new Error("PatternD is only defined for even numbers of rows");
  if (rows === 0n) return qnil;
  if (color === undefined) {
    const blockD1: Block = { design: "ROUND", color: "PURPLE", corner: "NW" };
    const blockD2: Block = { design: "ROUND", color: "PURPLE", corner: "NE" };
    const blockD3: Block = { design: "ROUND", color: "PURPLE", corner: "SW" };
    const blockD4: Block = { design: "ROUND", color: "PURPLE", corner: "SE" };
    const rowD1: Row = rcons(blockD1, rcons(blockD2, rnil));
    const rowD2: Row = rcons(blockD3, rcons(blockD4, rnil));
    const QuiltD: Quilt = qcons(
      rowD1,
      qcons(rowD2, PatternD(rows - 2n, color))
    );
    return QuiltD;
  } else {
    const blockD1: Block = { design: "ROUND", color: color, corner: "NW" };
    const blockD2: Block = { design: "ROUND", color: color, corner: "NE" };
    const blockD3: Block = { design: "ROUND", color: color, corner: "SW" };
    const blockD4: Block = { design: "ROUND", color: color, corner: "SE" };
    const rowD1: Row = rcons(blockD1, rcons(blockD2, rnil));
    const rowD2: Row = rcons(blockD3, rcons(blockD4, rnil));
    const QuiltD: Quilt = qcons(
      rowD1,
      qcons(rowD2, PatternD(rows - 2n, color))
    );
    return QuiltD;
  }
};
