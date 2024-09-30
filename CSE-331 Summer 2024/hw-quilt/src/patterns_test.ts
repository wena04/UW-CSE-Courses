import * as assert from "assert";
import {
  qnil,
  qcons,
  Row,
  rnil,
  rcons,
  NW,
  NE,
  SE,
  SW,
  PURPLE,
  GOLD,
  ROUND,
  STRAIGHT,
  Block,
} from "./quilt";
import { PatternA, PatternB, PatternC, PatternD } from "./patterns";

//Testing for patterns.ts
describe("patterns", function () {
  const nw_rnd_ppl: Block = { design: ROUND, color: PURPLE, corner: NW };
  const nw_rnd_au: Block = { design: ROUND, color: GOLD, corner: NW };
  const nw_strt_ppl: Block = { design: STRAIGHT, color: PURPLE, corner: NW };
  const nw_strt_au: Block = { design: STRAIGHT, color: GOLD, corner: NW };

  const ne_rnd_ppl: Block = { design: ROUND, color: PURPLE, corner: NE };
  const ne_rnd_au: Block = { design: ROUND, color: GOLD, corner: NE };
  const ne_strt_ppl: Block = { design: STRAIGHT, color: PURPLE, corner: NE };
  const ne_strt_au: Block = { design: STRAIGHT, color: GOLD, corner: NE };

  const se_rnd_ppl: Block = { design: ROUND, color: PURPLE, corner: SE };
  const se_rnd_au: Block = { design: ROUND, color: GOLD, corner: SE };
  //const se_strt_ppl: Block = { design: STRAIGHT, color: PURPLE, corner: SE };
  //const se_strt_au: Block = { design: STRAIGHT, color: GOLD, corner: SE };

  const sw_rnd_ppl: Block = { design: ROUND, color: PURPLE, corner: SW };
  const sw_rnd_au: Block = { design: ROUND, color: GOLD, corner: SW };
  //const sw_strt_ppl: Block = { design: STRAIGHT, color: PURPLE, corner: SW };
  //const sw_strt_au: Block = { design: STRAIGHT, color: GOLD, corner: SW };

  it("PatternA", function () {
    //setting up the correct 1 Row pattern for pattern A
    const row_ppl: Row = rcons(ne_rnd_ppl, rcons(ne_rnd_ppl, rnil)); //purple version of row
    const row_au: Row = rcons(ne_rnd_au, rcons(ne_rnd_au, rnil)); //gold version of row

    // Testing using 0-1-many heuristic

    //Testing when it should throw error: The "0" case, when rows <= 0
    //only 1 parameter (rows) passed in
    assert.throws(() => PatternA(-1n), Error);
    assert.throws(() => PatternA(-5n), Error);
    assert.deepStrictEqual(PatternA(0n), qnil);
    //when both parameter passed in
    assert.throws(() => PatternA(-1n, PURPLE), Error);
    assert.throws(() => PatternA(-5n, GOLD), Error);
    assert.deepStrictEqual(PatternA(0n, GOLD), qnil);

    //Testing the "1" case, when rows = 1 and should return qnil or just 1 row
    //only 1 parameter (rows) passed in
    assert.deepStrictEqual(PatternA(1n), qcons(row_ppl, qnil));
    //when both parameters passed in
    assert.deepStrictEqual(PatternA(1n, GOLD), qcons(row_au, qnil)); //testing boundaries

    //"Testing 2 rows
    assert.deepStrictEqual(PatternA(2n), qcons(row_ppl, qcons(row_ppl, qnil)));
    assert.deepStrictEqual(
      PatternA(2n, GOLD),
      qcons(row_au, qcons(row_au, qnil))
    );

    //Testing the "many" case, when rows > 1 and should return multiple rows
    //only 1 of the parameters passed in
    assert.deepStrictEqual(
      //testing an even number of rows
      PatternA(4n),
      qcons(row_ppl, qcons(row_ppl, qcons(row_ppl, qcons(row_ppl, qnil))))
    );

    assert.deepStrictEqual(
      //testing an odd number of rows
      PatternA(3n),
      qcons(row_ppl, qcons(row_ppl, qcons(row_ppl, qnil)))
    );
    //when both parameters passed in (only need gold version since the purple version is already tested above)
    assert.deepStrictEqual(
      PatternA(4n, GOLD),
      qcons(row_au, qcons(row_au, qcons(row_au, qcons(row_au, qnil))))
    );
    assert.deepStrictEqual(
      PatternA(3n, GOLD),
      qcons(row_au, qcons(row_au, qcons(row_au, qnil)))
    );
  });

  it("PatternB", function () {
    //setting up the correct 1 Row pattern for pattern B
    const row_ppl: Row = rcons(ne_strt_ppl, rcons(nw_strt_ppl, rnil)); //purple version of row
    const row_au: Row = rcons(ne_strt_au, rcons(nw_strt_au, rnil)); //gold version of row

    // Testing using 0-1-many heuristic

    //Testing when it should throw error: The "0" case, when rows <= 0
    //only 1 parameter (rows) passed in
    assert.throws(() => PatternB(-1n), Error);
    assert.throws(() => PatternB(-5n), Error);
    assert.deepStrictEqual(PatternB(0n), qnil);
    //when both parameter passed in
    assert.throws(() => PatternB(-1n, PURPLE), Error);
    assert.throws(() => PatternB(-5n, GOLD), Error);
    assert.deepStrictEqual(PatternB(0n, GOLD), qnil);

    //Testing the "1" case, when rows = 1 and should return qnil or just 1 row
    //only 1 parameter (rows) passed in
    assert.deepStrictEqual(PatternB(1n), qcons(row_ppl, qnil));
    //when both parameters passed in
    assert.deepStrictEqual(PatternB(1n, GOLD), qcons(row_au, qnil)); //testing boundaries

    //"Testing 2 rows
    assert.deepStrictEqual(PatternB(2n), qcons(row_ppl, qcons(row_ppl, qnil)));
    assert.deepStrictEqual(
      PatternB(2n, GOLD),
      qcons(row_au, qcons(row_au, qnil))
    );

    //Testing the "many" case, when rows > 1 and should return multiple rows
    //only 1 of the parameters passed in
    assert.deepStrictEqual(
      //testing an even number of rows
      PatternB(4n),
      qcons(row_ppl, qcons(row_ppl, qcons(row_ppl, qcons(row_ppl, qnil))))
    );

    assert.deepStrictEqual(
      //testing an odd number of rows
      PatternB(3n),
      qcons(row_ppl, qcons(row_ppl, qcons(row_ppl, qnil)))
    );
    //when both parameters passed in (only need gold version since the purple version is already tested above)
    assert.deepStrictEqual(
      PatternB(4n, GOLD),
      qcons(row_au, qcons(row_au, qcons(row_au, qcons(row_au, qnil))))
    );
    assert.deepStrictEqual(
      PatternB(3n, GOLD),
      qcons(row_au, qcons(row_au, qcons(row_au, qnil)))
    );
  });

  it("PatternC", function () {
    //setting up the correct 2 Row pattern for pattern C
    const row_ppl: Row = rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rnil)); //purple version of row 1
    const row_au: Row = rcons(se_rnd_au, rcons(sw_rnd_au, rnil)); //gold version of row 1
    const row2_ppl: Row = rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rnil)); //purple version of row 2
    const row2_au: Row = rcons(ne_rnd_au, rcons(nw_rnd_au, rnil)); //gold version

    // Testing using 0-1-many heuristic

    //Testing when it should throw error: The "0" case, when rows are even or <=0
    //only 1 parameter (rows) passed in
    assert.throws(() => PatternC(-1n), Error);
    assert.throws(() => PatternC(-5n), Error);
    assert.throws(() => PatternC(1n), Error);
    assert.deepStrictEqual(PatternC(0n), qnil);
    //when both parameter passed in
    assert.throws(() => PatternC(-3n, PURPLE), Error);
    assert.throws(() => PatternC(-5n, GOLD), Error);
    assert.throws(() => PatternC(1n, GOLD), Error);
    assert.deepStrictEqual(PatternC(0n, GOLD), qnil);

    //Testing the "1" recursive call case, where rows = 2
    //"Testing 2 rows since its the smallest even number after 0 which we tested
    assert.deepStrictEqual(PatternC(2n), qcons(row_ppl, qcons(row2_ppl, qnil)));
    assert.deepStrictEqual(
      PatternC(2n, GOLD),
      qcons(row_au, qcons(row2_au, qnil))
    );

    //Testing the "many" case, when rows > 1 and should return multiple even rows
    //only 1 of the parameters (rows) passed in
    assert.deepStrictEqual(
      //testing an even number of rows
      PatternC(4n),
      qcons(row_ppl, qcons(row2_ppl, qcons(row_ppl, qcons(row2_ppl, qnil))))
    );

    //when both parameters passed in (only need gold version since the purple version is already tested above)
    assert.deepStrictEqual(
      PatternC(4n, GOLD),
      qcons(row_au, qcons(row2_au, qcons(row_au, qcons(row2_au, qnil))))
    );
  });

  it("PatternD", function () {
    //setting up the correct 2 Row pattern for pattern D
    const row_ppl: Row = rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)); //purple version of row 1
    const row_au: Row = rcons(nw_rnd_au, rcons(ne_rnd_au, rnil)); //gold version of row 1
    const row2_ppl: Row = rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)); //purple version of row 2
    const row2_au: Row = rcons(sw_rnd_au, rcons(se_rnd_au, rnil)); //gold version

    // Testing using 0-1-many heuristic

    //Testing when it should throw error: The "0" case, when rows are even or <=0
    //only 1 parameter (rows) passed in
    assert.throws(() => PatternD(-1n), Error);
    assert.throws(() => PatternD(-5n), Error);
    assert.throws(() => PatternD(1n), Error);
    assert.deepStrictEqual(PatternD(0n), qnil);
    //when both parameter passed in
    assert.throws(() => PatternD(-3n, PURPLE), Error);
    assert.throws(() => PatternD(-5n, GOLD), Error);
    assert.throws(() => PatternD(1n, GOLD), Error);
    assert.deepStrictEqual(PatternD(0n, GOLD), qnil);

    //Testing the "1" recursive call case, where rows = 2
    //"Testing 2 rows since its the smallest even number after 0 which we tested
    assert.deepStrictEqual(PatternD(2n), qcons(row_ppl, qcons(row2_ppl, qnil)));
    assert.deepStrictEqual(
      PatternD(2n, GOLD),
      qcons(row_au, qcons(row2_au, qnil))
    );

    //Testing the "many" case, when rows > 1 and should return multiple even rows
    //only 1 of the parameters (rows) passed in
    assert.deepStrictEqual(
      //testing an even number of rows
      PatternD(4n),
      qcons(row_ppl, qcons(row2_ppl, qcons(row_ppl, qcons(row2_ppl, qnil))))
    );

    //when both parameters passed in (only need gold version since the purple version is already tested above)
    assert.deepStrictEqual(
      PatternD(4n, GOLD),
      qcons(row_au, qcons(row2_au, qcons(row_au, qcons(row2_au, qnil))))
    );
  });
});
