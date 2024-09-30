import * as assert from "assert";
import {
  NW,
  NE,
  SW,
  SE,
  PURPLE,
  GOLD,
  ROUND,
  STRAIGHT,
  Block,
  rnil,
  rcons,
  qnil,
  qcons,
} from "./quilt";
import {
  bflip_vert,
  rflip_vert,
  qflip_vert,
  bflip_horz,
  rflip_horz,
  qflip_horz,
  sew,
  symmetrize,
} from "./quilt_ops";

describe("quilt_ops", function () {
  // Feel free to use these constants in your tests (though it's not required)
  // and create any others you find useful!

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
  const se_strt_ppl: Block = { design: STRAIGHT, color: PURPLE, corner: SE };
  const se_strt_au: Block = { design: STRAIGHT, color: GOLD, corner: SE };

  const sw_rnd_ppl: Block = { design: ROUND, color: PURPLE, corner: SW };
  const sw_rnd_au: Block = { design: ROUND, color: GOLD, corner: SW };
  const sw_strt_ppl: Block = { design: STRAIGHT, color: PURPLE, corner: SW };
  const sw_strt_au: Block = { design: STRAIGHT, color: GOLD, corner: SW };

  const r_nw_rnd_ppl = rcons(nw_rnd_ppl, rnil);
  const r_ne_rnd_ppl = rcons(ne_rnd_ppl, rnil);
  const r_rnd_ppl = rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil));
  const r_sew_rnd_ppl = rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rnil));
  const r_swe_rnd_ppl = rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil));
  const r3_rnd_ppl = rcons(
    nw_rnd_ppl,
    rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)))
  );
  const r4_rnd_ppl = rcons(
    se_rnd_ppl,
    rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rnil)))
  );

  it("bflip_vert", function () {
    // exhuasive testing since its not recursive and striaght from spec

    // SW -> NW for both types of design and color
    assert.deepStrictEqual(bflip_vert(sw_strt_au), nw_strt_au);
    assert.deepStrictEqual(bflip_vert(sw_rnd_au), nw_rnd_au);
    assert.deepStrictEqual(bflip_vert(sw_strt_ppl), nw_strt_ppl);
    assert.deepStrictEqual(bflip_vert(sw_rnd_ppl), nw_rnd_ppl);

    // SE -> NE for both types of design and color
    assert.deepStrictEqual(bflip_vert(se_rnd_au), ne_rnd_au);
    assert.deepStrictEqual(bflip_vert(se_strt_au), ne_strt_au);
    assert.deepStrictEqual(bflip_vert(se_rnd_ppl), ne_rnd_ppl);
    assert.deepStrictEqual(bflip_vert(se_strt_ppl), ne_strt_ppl);

    // NW -> SW for both types of design and color
    assert.deepStrictEqual(bflip_vert(nw_strt_au), sw_strt_au);
    assert.deepStrictEqual(bflip_vert(nw_rnd_au), sw_rnd_au);
    assert.deepStrictEqual(bflip_vert(nw_strt_ppl), sw_strt_ppl);
    assert.deepStrictEqual(bflip_vert(nw_rnd_ppl), sw_rnd_ppl);

    // NE -> SE for both types of design and color
    assert.deepStrictEqual(bflip_vert(ne_rnd_au), se_rnd_au);
    assert.deepStrictEqual(bflip_vert(ne_strt_au), se_strt_au);
    assert.deepStrictEqual(bflip_vert(ne_rnd_ppl), se_rnd_ppl);
    assert.deepStrictEqual(bflip_vert(ne_strt_ppl), se_strt_ppl);
  });

  it("rflip_vert", function () {
    //Test using 0-1-many heuristic since using recursion
    // Testing the base case/"0" cases, when just a empty row
    assert.deepStrictEqual(rflip_vert(rnil), rnil);

    //Testing the "1" cases, when just a single block in a row
    assert.deepStrictEqual(rflip_vert(r_nw_rnd_ppl), rcons(sw_rnd_ppl, rnil));
    assert.deepStrictEqual(rflip_vert(r_ne_rnd_ppl), rcons(se_rnd_ppl, rnil));

    //Testing the "many" cases, when multiple blocks in a row
    assert.deepStrictEqual(
      rflip_vert(r_rnd_ppl),
      rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil))
    );
    assert.deepStrictEqual(
      rflip_vert(r_sew_rnd_ppl),
      rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rnil))
    );
  });

  it("qflip_vert", function () {
    //Test using 0-1-many heuristic since using recursion
    // Testing the base case/"0" cases, when just a empty row
    assert.deepStrictEqual(
      qflip_vert(qcons(r_nw_rnd_ppl, qnil)),
      qcons(rcons(sw_rnd_ppl, rnil), qnil)
    );
    //Testing the "1" cases, when just a row
    assert.deepStrictEqual(
      qflip_vert(qcons(r_nw_rnd_ppl, qnil)),
      qcons(rcons(sw_rnd_ppl, rnil), qnil)
    );
    assert.deepStrictEqual(
      qflip_vert(qcons(r_ne_rnd_ppl, qnil)),
      qcons(rcons(se_rnd_ppl, rnil), qnil)
    );

    //Testing the "many" cases, when multiple rows
    assert.deepStrictEqual(
      qflip_vert(qcons(r_rnd_ppl, qcons(r_rnd_ppl, qnil))),
      qcons(
        rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)),
        qcons(rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)), qnil)
      )
    );
    assert.deepStrictEqual(
      qflip_vert(qcons(r_sew_rnd_ppl, qcons(r_sew_rnd_ppl, qnil))),
      qcons(
        rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rnil)),
        qcons(rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rnil)), qnil)
      )
    );
  });

  it("bflip_horz", function () {
    // exhuasive testing since its not recursive and striaght from spec
    // SW -> SE for both types of design and color
    assert.deepStrictEqual(bflip_horz(sw_rnd_au), se_rnd_au);
    assert.deepStrictEqual(bflip_horz(sw_strt_au), se_strt_au);

    // SE -> SW for both types of design and color
    assert.deepStrictEqual(bflip_horz(se_rnd_au), sw_rnd_au);
    assert.deepStrictEqual(bflip_horz(se_strt_au), sw_strt_au);

    // NW -> NE for both types of design and color
    assert.deepStrictEqual(bflip_horz(nw_rnd_au), ne_rnd_au);
    assert.deepStrictEqual(bflip_horz(nw_strt_au), ne_strt_au);

    // NE -> NW for both types of design and color
    assert.deepStrictEqual(bflip_horz(ne_rnd_au), nw_rnd_au);
    assert.deepStrictEqual(bflip_horz(ne_strt_au), nw_strt_au);
  });

  it("rflip_horz", function () {
    //Test using 0-1-many heuristic since using recursion
    // Testing the base case/"0" cases, when just a empty row
    assert.deepStrictEqual(rflip_horz(rnil), rnil);

    //Testing the "1" cases, when just a single block in a row
    assert.deepStrictEqual(rflip_horz(r_nw_rnd_ppl), r_ne_rnd_ppl);
    assert.deepStrictEqual(rflip_horz(r_ne_rnd_ppl), r_nw_rnd_ppl);

    //Testing the "many" cases, when multiple blocks in a row
    assert.deepStrictEqual(
      rflip_horz(r4_rnd_ppl),
      rcons(
        se_rnd_ppl,
        rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rnil)))
      )
    );
    assert.deepStrictEqual(
      rflip_horz(r3_rnd_ppl),
      rcons(
        nw_rnd_ppl,
        rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)))
      )
    );
  });

  it("qflip_horz", function () {
    //Test using 0-1-many heuristic since using recursion
    // Testing the base case/"0" cases, when just a empty row
    assert.deepStrictEqual(qflip_horz(qnil), qnil);

    //Testing the "1" cases, when just a row
    assert.deepStrictEqual(
      qflip_horz(qcons(r_nw_rnd_ppl, qnil)),
      qcons(r_ne_rnd_ppl, qnil)
    );
    assert.deepStrictEqual(
      qflip_horz(qcons(r_ne_rnd_ppl, qnil)),
      qcons(r_nw_rnd_ppl, qnil)
    );

    //Testing the "many" cases, when multiple rows
    assert.deepStrictEqual(
      qflip_horz(qcons(r_ne_rnd_ppl, qcons(r_nw_rnd_ppl, qnil))),
      qcons(r_nw_rnd_ppl, qcons(r_ne_rnd_ppl, qnil))
    );
    assert.deepStrictEqual(
      qflip_horz(qcons(r4_rnd_ppl, qcons(r4_rnd_ppl, qnil))),
      qcons(r4_rnd_ppl, qcons(r4_rnd_ppl, qnil))
    );
  });

  it("sew", function () {
    // invalid case: (qnil, !qnil)
    assert.throws(() => sew(qnil, qcons(r_rnd_ppl, qnil)), Error);
    assert.throws(
      () => sew(qnil, qcons(r_rnd_ppl, qcons(r_rnd_ppl, qnil))),
      Error
    );

    // invalid case: (!qnil, qnil)
    assert.throws(() => sew(qcons(r_rnd_ppl, qnil), qnil), Error);
    assert.throws(
      () => sew(qcons(r_rnd_ppl, qcons(r_rnd_ppl, qnil)), qnil),
      Error
    );

    // 0-1-many: base case
    assert.deepStrictEqual(sew(qnil, qnil), qnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(
      sew(qcons(r_rnd_ppl, qnil), qcons(r_rnd_ppl, qnil)),
      qcons(r3_rnd_ppl, qnil)
    );
    assert.deepStrictEqual(
      sew(qcons(r_sew_rnd_ppl, qnil), qcons(r_sew_rnd_ppl, qnil)),
      qcons(r4_rnd_ppl, qnil)
    );

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(
      sew(
        qcons(r_rnd_ppl, qcons(r_rnd_ppl, qnil)),
        qcons(r_rnd_ppl, qcons(r_rnd_ppl, qnil))
      ),
      qcons(r3_rnd_ppl, qcons(r3_rnd_ppl, qnil))
    );
    assert.deepStrictEqual(
      sew(
        qcons(r_sew_rnd_ppl, qcons(r_sew_rnd_ppl, qcons(r_sew_rnd_ppl, qnil))),
        qcons(r_sew_rnd_ppl, qcons(r_sew_rnd_ppl, qcons(r_sew_rnd_ppl, qnil)))
      ),
      qcons(r4_rnd_ppl, qcons(r4_rnd_ppl, qcons(r4_rnd_ppl, qnil)))
    );
  });

  it("symmetrize", function () {
    // Straight line code, minimum 2 tests required (>2 added to help you build
    // confidence that the functions you wrote are correct)

    assert.deepStrictEqual(symmetrize(qnil), qnil);
    assert.deepStrictEqual(
      symmetrize(qcons(rcons(nw_rnd_ppl, rnil), qnil)),
      qcons(
        rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)),
        qcons(rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)), qnil)
      )
    );

    assert.deepStrictEqual(
      symmetrize(qcons(rcons(nw_rnd_ppl, rnil), qnil)),
      qcons(
        rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)),
        qcons(rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)), qnil)
      )
    );
    assert.deepStrictEqual(
      symmetrize(qcons(rcons(se_rnd_ppl, rnil), qnil)),
      qcons(
        rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rnil)),
        qcons(rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rnil)), qnil)
      )
    );

    assert.deepStrictEqual(
      symmetrize(qcons(r_rnd_ppl, qnil)),
      qcons(
        rcons(
          nw_rnd_ppl,
          rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)))
        ),
        qcons(
          rcons(
            sw_rnd_ppl,
            rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)))
          ),
          qnil
        )
      )
    );
    assert.deepStrictEqual(
      symmetrize(qcons(r_rnd_ppl, qcons(r_swe_rnd_ppl, qnil))),
      qcons(
        rcons(
          nw_rnd_ppl,
          rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)))
        ),
        qcons(
          rcons(
            sw_rnd_ppl,
            rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)))
          ),
          qcons(
            rcons(
              nw_rnd_ppl,
              rcons(ne_rnd_ppl, rcons(nw_rnd_ppl, rcons(ne_rnd_ppl, rnil)))
            ),
            qcons(
              rcons(
                sw_rnd_ppl,
                rcons(se_rnd_ppl, rcons(sw_rnd_ppl, rcons(se_rnd_ppl, rnil)))
              ),
              qnil
            )
          )
        )
      )
    );
  });
});
