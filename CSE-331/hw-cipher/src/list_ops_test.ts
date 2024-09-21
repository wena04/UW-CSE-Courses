import * as assert from "assert";
import { nil } from "./list";
import { explode } from "./char_list";
import { last, prefix, suffix } from "./list_ops";

describe("list_ops", function () {
  it("last", function () {
    // Error case branch
    assert.throws(() => last(nil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(last(explode("a")), "a".charCodeAt(0));
    assert.deepStrictEqual(last(explode("_")), "_".charCodeAt(0));

    // 0-1-many: one recursive call
    assert.deepStrictEqual(last(explode("hm")), "m".charCodeAt(0));
    assert.deepStrictEqual(last(explode("hu")), "u".charCodeAt(0));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(last(explode("hub")), "b".charCodeAt(0));
    assert.deepStrictEqual(last(explode("stray")), "y".charCodeAt(0));
    assert.deepStrictEqual(last(explode("shrug")), "g".charCodeAt(0));
  });

  it("prefix", function () {
    // Using 0-1-many testing strategy since its recursive
    // 0 recursive calls: base case/n=0 or empty list or n > len(L)

    //when n = 0 returns nil
    assert.deepStrictEqual(prefix(0n, explode("abcdef")), nil); //when n = 0
    assert.deepStrictEqual(prefix(0n, nil), nil); //empty list still return nil too
    //error when n > len(L)
    assert.throws(() => prefix(5n, explode("a")), Error);
    assert.throws(() => prefix(1n, nil), Error); //error when n > len(L) and n < 0

    //1 recursive call: when n = 1 and len(L) > 1
    assert.deepStrictEqual(prefix(1n, explode("a")), explode("a")); // boundary case when n = 1 and len(L) = 1 too
    assert.deepStrictEqual(prefix(1n, explode("bcdef")), explode("b")); //when n = 1 and len(L) > 1

    //2+ recursive calls: when n > 1 and len(L) > 1
    assert.deepStrictEqual(prefix(2n, explode("abcdef")), explode("ab")); //even case
    assert.deepStrictEqual(prefix(3n, explode("abcdef")), explode("abc")); //odd case
    assert.deepStrictEqual(prefix(4n, explode("abcdef")), explode("abcd"));
  });

  it("suffix", function () {
    // Using 0-1-many testing strategy since its recursive

    // 0 recursive calls: base case/n=0 or empty list or n > len(L)
    //when n = 0 returns L
    assert.deepStrictEqual(suffix(0n, explode("abcdef")), explode("abcdef")); //when n = 0
    assert.deepStrictEqual(suffix(0n, nil), nil); //empty list still return nil too

    //1 recursive call: when n = 1 and len(L) > 1
    assert.deepStrictEqual(suffix(1n, explode("a")), nil); // boundary case when n = 1 and len(L) = 1 too
    assert.deepStrictEqual(suffix(1n, explode("abcd")), explode("bcd")); //when n = 1 and len(L) > 1

    //assert.deepStrictEqual(suffix(4n, explode("bcdef")), explode("f"));

    //2+ recursive calls: when n > 1 and len(L) > 1
    assert.deepStrictEqual(suffix(2n, explode("abcdef")), explode("cdef")); //even case
    assert.deepStrictEqual(suffix(3n, explode("abcdef")), explode("def")); //odd case
    assert.deepStrictEqual(suffix(4n, explode("abcdef")), explode("ef"));

    //error when n > len(L) (different number of recursive calls)
    assert.throws(() => suffix(5n, explode("a")), Error);
    assert.throws(() => suffix(1n, nil), Error); //error when n > len(L) and n < 0
  });
});
