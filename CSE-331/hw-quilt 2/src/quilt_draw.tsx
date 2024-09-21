import React from 'react';
import { GOLD, ROUND, NW, NE, SW, SE, Block, Row, Quilt, rlen } from './quilt';
import { JsxList, jnil, jcons, jcompact } from './jsx_list';
import StraightGold from './img/straight-gold.png';
import StraightPurple from './img/straight-purple.png';
import RoundGold from './img/round-gold.png';
import RoundPurple from './img/round-purple.png';
import './quilt_draw.css';


// Returns the class name to put on the image element for the given block.
const BlockClass = (block: Block): string => {
  switch (block.corner) {
    case NW: return "block rotate-nw";
    case SW: return "block rotate-sw";
    case SE: return "block rotate-se";
    case NE: return "block rotate-ne";
  }
};

/** Returns an element that draws the given block. */
export const BlockElem = (props: {block: Block}): JSX.Element => {
  const cls = BlockClass(props.block)
  if (props.block.color === GOLD ) {
    if (props.block.design === ROUND) {
      return <img src={RoundGold} className={cls}/>
    } else {
      return <img src={StraightGold} className={cls}/>
    }
  } else {
    if (props.block.design === ROUND) {
      return <img src={RoundPurple} className={cls}/>
    } else {
      return <img src={StraightPurple} className={cls}/>
    }
  }
};

// Returns a list of block elements for each block in the given row.
const getBlockElems = (row: Row, key: number): JsxList => {
  if (row.kind === "rnil") {
    return jnil;
  } else {
    return jcons(<BlockElem key={key} block={row.hd}/>,
        getBlockElems(row.tl, key + 1));
  }
};

// Returns a list of DIV elements, one for each row in the given quilt.
// Throws an exception if any row has a different length than expected.
const getRowElems = (quilt: Quilt, expLen: bigint, key: number): JsxList => {
  if (quilt.kind === "qnil") {
    return jnil;
  } else {
    const rowLen = rlen(quilt.hd);
    if (rowLen !== expLen) {
      throw new Error(
          `bad quilt argument: rows have different lengths: ${rowLen} vs ${expLen}`);
    } else {
      const row = jcompact(getBlockElems(quilt.hd, 0));
      return jcons(<div key={key} className="row">{row}</div>,
          getRowElems(quilt.tl, expLen, key + 1));
    }
  }
};


/** Returns an element that draws the given quilt. */
export const QuiltElem = (props: {quilt: Quilt}): JSX.Element => {
  if (props.quilt.kind === "qnil") {
  throw new Error("bad quilt argument: cannot have 0 rows");
  } else {
    const exp_len = rlen(props.quilt.hd);
    const rows = jcompact(getRowElems(props.quilt, exp_len, 0));
    return <div>{rows}</div>;
  }
};
