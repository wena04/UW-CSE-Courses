import {
  Block,
  Row,
  rcons,
  rconcat,
  rnil,
  Quilt,
  qnil,
  qcons,
  qconcat,
} from "./quilt";

/** Returns the same block but flipped vertically. */
export const bflip_vert = (b: Block): Block => {
  if (b.corner === "SE") {
    const ans: Block = { design: b.design, color: b.color, corner: "NE" };
    return ans;
  } else if (b.corner === "SW") {
    const ans: Block = { design: b.design, color: b.color, corner: "NW" };
    return ans;
  } else if (b.corner === "NE") {
    const ans: Block = { design: b.design, color: b.color, corner: "SE" };
    return ans;
  } else {
    const ans: Block = { design: b.design, color: b.color, corner: "SW" };
    return ans;
  }
};

/** Returns the same row but flipped vertically. */
export const rflip_vert = (r: Row): Row => {
  if (r.kind === "rnil") {
    return r;
  } else {
    const ans: Row = rcons(bflip_vert(r.hd), rflip_vert(r.tl));
    return ans;
  }
};

/** Returns the same quilt but flipped vertically. */
export const qflip_vert = (q: Quilt): Quilt => {
  if (q.kind === "qnil") {
    return qnil;
  } else {
    const ans: Quilt = qconcat(qflip_vert(q.tl), qcons(rflip_vert(q.hd), qnil));
    return ans;
  }
};

/** Returns the same block but flipped horizontally. */
export const bflip_horz = (b: Block): Block => {
  if (b.corner === "SE") {
    const ans: Block = { design: b.design, color: b.color, corner: "SW" };
    return ans;
  } else if (b.corner === "SW") {
    const ans: Block = { design: b.design, color: b.color, corner: "SE" };
    return ans;
  } else if (b.corner === "NE") {
    const ans: Block = { design: b.design, color: b.color, corner: "NW" };
    return ans;
  } else {
    const ans: Block = { design: b.design, color: b.color, corner: "NE" };
    return ans;
  }
};

/** Returns the same row but flipped horizontally. */
export const rflip_horz = (r: Row): Row => {
  if (r.kind === "rnil") {
    return r;
  } else {
    const ans: Row = rconcat(rflip_horz(r.tl), rcons(bflip_horz(r.hd), rnil));
    return ans;
  }
};

/** Returns the same quilt but flipped horizontally. */
export const qflip_horz = (q: Quilt): Quilt => {
  if (q.kind === "qnil") {
    return qnil;
  } else {
    const ans: Quilt = qcons(rflip_horz(q.hd), qflip_horz(q.tl));
    return ans;
  }
};

/**
 * Returns the result of sewing together q1 and q2 horizontally, i.e.,
 * concatenating each of their rows. Throws an exception if they are not the
 * same length.
 */
export const sew = (q1: Quilt, q2: Quilt): Quilt => {
  if (q1.kind === "qnil") {
    if (q2.kind === "qnil") {
      return qnil;
    } else {
      throw new Error("bad q2 argument: q1 has none rows but q2 has some");
    }
  } else {
    if (q2.kind === "qnil") {
      throw new Error("bad q1 argument: q2 has none rows but q1 has some");
    } else {
      return qcons(rconcat(q1.hd, q2.hd), sew(q1.tl, q2.tl));
    }
  }
};

/**
 * Returns the result of symmetrizing this quilt first vertically, by sewing it
 * together with its horizontally flipped version, and then horizontally, by
 * concatenating its rows with those of its vertically flipped version.
 */
export const symmetrize = (q: Quilt): Quilt => {
  const r = sew(q, qflip_horz(q));
  return qconcat(r, qflip_vert(r));
};
