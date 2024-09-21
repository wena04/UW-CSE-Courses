import * as assert from "assert";
import { fact, r, s, t } from "./funcs";

describe("funcs", function () {
  // TODO: uncomment these when you have implemented and imported "r"
  it("r", function () {
    assert.deepStrictEqual(r({ n: 0n, m: 0n }), 1n);
    assert.deepStrictEqual(r({ n: 0n, m: 5n }), 1n);
    assert.deepStrictEqual(r({ n: 1n, m: 0n }), -1n);
    assert.deepStrictEqual(r({ n: 2n, m: 0n }), -1n);
    assert.deepStrictEqual(r({ n: 2n, m: 2n }), 0n);
    assert.deepStrictEqual(r({ n: 19n, m: 13n }), 0n);
  });

  // TODO: uncomment these when you have implemented and imported "s"
  it("s", function () {
    assert.deepStrictEqual(s(true), 0n);
    assert.deepStrictEqual(s(false), 0n);
    assert.deepStrictEqual(s([true, 0n]), 0n);
    assert.deepStrictEqual(s([true, 5n]), 5n);
    assert.deepStrictEqual(s([true, 9n]), 9n);
    assert.deepStrictEqual(s([false, 0n]), 1n);
    assert.deepStrictEqual(s([false, 5n]), 6n);
    assert.deepStrictEqual(s([false, 11n]), 12n);
  });

  // TODO: uncomment these when you have implemented and imported "t"
  it("t", function () {
    assert.deepStrictEqual(t([true, { n: 0n, m: 0n }]), 0n);
    assert.deepStrictEqual(t([true, { n: 1n, m: 0n }]), 0n);
    assert.deepStrictEqual(t([true, { n: 5n, m: 8n }]), 40n);
    assert.deepStrictEqual(t([true, { n: -9n, m: 2n }]), -18n);
    assert.deepStrictEqual(t([false, { n: 0n, m: 0n }]), 0n);
    assert.deepStrictEqual(t([false, { n: 1n, m: 0n }]), 1n);
    assert.deepStrictEqual(t([false, { n: -1n, m: 3n }]), -7n);
    assert.deepStrictEqual(t([false, { n: 10n, m: 2n }]), 6n);
  });

  // TODO: write tests according to our heuristics for "fact" here
  //       after you have implemented and imported it. Don't forget
  //       to add comments justifying your cases!
  it("fact", function () {
    // 0-1 many heuristic: base case
    assert.deepStrictEqual(fact(0n), 1n);
    // only 1 case since we don't have to worry about negative numbers

    // 0-1 many heuristic: 1 recursive call
    assert.deepStrictEqual(fact(1n), 1n); //also the boundary/edge case

    // 0-1 many heuristic: more than 1 recursive calls
    assert.deepStrictEqual(fact(5n), 120n);
    assert.deepStrictEqual(fact(10n), 3628800n); //chose bigger number to test for runtime errors and such

    // assert.deepStrictEqual takes 2 arguments:
    //  - first an actual value: where we call the function we're testing
    //  - second an expected value: what the function should return for the inputs
    // Then, assert compares these arguments and the case passes if they are equal.

    // You should have an assert.deepStrictEqual statement for each test
    // case you need (according to our heuristics)

    // We'll talk about the format of this test file and how these tests work more
    // in later sections!
  });
});
