import * as assert from "assert";
import { nil } from "./list";
import { compact, explode } from "./char_list";
import {
  next_latin_char,
  prev_latin_char,
  count_consonants,
  worm_latin_decode,
  cipher_encode,
  cipher_decode,
  crazy_caps_encode,
  crazy_caps_decode,
} from "./latin_ops";

describe("latin_ops", function () {
  // For the following 2 functions, there are a finite number of cases
  // but the number exceeds our reasonable case limit of 20, so just some
  // were selected.
  it("next_latin_char", function () {
    assert.equal(next_latin_char("a".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(next_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(next_latin_char("i".charCodeAt(0)), "u".charCodeAt(0));
    assert.equal(next_latin_char("o".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(next_latin_char("u".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(next_latin_char("j".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(next_latin_char("g".charCodeAt(0)), "j".charCodeAt(0));
    assert.equal(next_latin_char("d".charCodeAt(0)), "b".charCodeAt(0));
    assert.equal(next_latin_char("t".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(next_latin_char("c".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(next_latin_char("k".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(next_latin_char("f".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(next_latin_char("v".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(next_latin_char("w".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(next_latin_char("h".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(next_latin_char("l".charCodeAt(0)), "h".charCodeAt(0));
    assert.equal(next_latin_char("r".charCodeAt(0)), "l".charCodeAt(0));
    assert.equal(next_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(next_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(next_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it("prev_latin_char", function () {
    assert.equal(prev_latin_char("a".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(prev_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(prev_latin_char("i".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(prev_latin_char("u".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(prev_latin_char("y".charCodeAt(0)), "e".charCodeAt(0));
    assert.equal(prev_latin_char("b".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(prev_latin_char("p".charCodeAt(0)), "t".charCodeAt(0));
    assert.equal(prev_latin_char("j".charCodeAt(0)), "g".charCodeAt(0));
    assert.equal(prev_latin_char("g".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(prev_latin_char("k".charCodeAt(0)), "s".charCodeAt(0));
    assert.equal(prev_latin_char("s".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(prev_latin_char("z".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(prev_latin_char("f".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(prev_latin_char("v".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(prev_latin_char("w".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(prev_latin_char("l".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(prev_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(prev_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(prev_latin_char("q".charCodeAt(0)), "x".charCodeAt(0));
    assert.equal(prev_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it("cipher_encode", function () {
    // Using 0-1-many testing strategy since its recursive
    // 0 recursive calls: base case (nil) / empty list
    assert.deepStrictEqual(cipher_encode(nil), nil);

    // 1 recursive call: when only have 1 character in the list
    assert.deepStrictEqual(cipher_encode(explode("a")), explode("i"));
    assert.deepStrictEqual(cipher_encode(explode("e")), explode("y"));
    assert.deepStrictEqual(cipher_encode(explode("i")), explode("u"));
    assert.deepStrictEqual(cipher_encode(explode("o")), explode("a"));

    // 2+ recursive calls: when have 2 or more characters in the list
    assert.deepStrictEqual(cipher_encode(explode("cse")), explode("zky"));
    assert.deepStrictEqual(cipher_encode(explode("hello")), explode("ryhha")); //test for more characters for in case
  });

  it("cipher_decode", function () {
    // Using 0-1-many testing strategy since its recursive
    // 0 recursive calls
    // base case (nil) / empty list
    assert.deepStrictEqual(cipher_decode(nil), nil);

    // 1 recursive call: when only have 1 character in the list
    assert.deepStrictEqual(cipher_decode(explode("i")), explode("a"));
    assert.deepStrictEqual(cipher_decode(explode("y")), explode("e"));

    // 2+ recursive calls: when have 2 or more characters in the list
    assert.deepStrictEqual(cipher_decode(explode("zky")), explode("cse"));
    assert.deepStrictEqual(cipher_decode(explode("ryhha")), explode("hello")); //test for more characters for in case
  });

  it("crazy_caps_encode", function () {
    // Using 0-1-many testing strategy since its recursive
    // 0 case: base case (nil)/empty list
    assert.deepStrictEqual(crazy_caps_encode(nil), nil);
    assert.deepStrictEqual(crazy_caps_encode(explode("a")), explode("a"));
    assert.deepStrictEqual(crazy_caps_encode(explode("ab")), explode("ab"));

    // 1 case: when only have 3-5 character in the list
    // when one character needs to be capitalized
    assert.deepStrictEqual(crazy_caps_encode(explode("add")), explode("adD"));
    assert.deepStrictEqual(crazy_caps_encode(explode("addf")), explode("adDf"));
    assert.deepStrictEqual(
      crazy_caps_encode(explode("addfj")),
      explode("adDfj")
    );

    // many case: when have 6 or more characters in the list
    // when 2 characters need to be capitalized
    assert.deepStrictEqual(
      crazy_caps_encode(explode("abcdef")),
      explode("abCdeF")
    );
    // when 3 characters need to be capitalized
    assert.deepStrictEqual(
      crazy_caps_encode(explode("abcdeggh")),
      explode("abCdeGgh")
    );
    // when 4 characters need to be capitalized
    assert.deepStrictEqual(
      crazy_caps_encode(explode("abcdefghij")),
      explode("abCdeFghIj")
    );
  });

  it("crazy_caps_decode", function () {
    // Using 0-1-many testing strategy since its recursive
    // 0 case: base case (nil)/empty list or 1,2 character in the list
    assert.deepStrictEqual(crazy_caps_decode(nil), nil);
    assert.deepStrictEqual(crazy_caps_decode(explode("a")), explode("a"));
    assert.deepStrictEqual(crazy_caps_decode(explode("ab")), explode("ab"));

    // 1 case: when only have 3-5 characters in the list
    assert.deepStrictEqual(crazy_caps_decode(explode("abC")), explode("abc"));
    // when 1 characters need to be lowercased
    assert.deepStrictEqual(crazy_caps_decode(explode("abCf")), explode("abcf"));
    assert.deepStrictEqual(
      crazy_caps_decode(explode("abCde")),
      explode("abcde")
    );

    // many case: when have 3 or more characters in the list
    // when 2 characters need to be lowercased
    assert.deepStrictEqual(
      crazy_caps_decode(explode("abCdeF")),
      explode("abcdef")
    );
    // when 3 characters need to be lowercased
    assert.deepStrictEqual(
      crazy_caps_decode(explode("abCdeFgh")),
      explode("abcdefgh")
    );
  });

  it("count_consonants", function () {
    // 0-1-many: base case (nil)
    assert.deepStrictEqual(count_consonants(nil), -1n);
    // 0-1-many: base case (1st char is vowel, no recursive calls)
    assert.deepStrictEqual(count_consonants(explode("e")), 0n);
    assert.deepStrictEqual(count_consonants(explode("astray")), 0n);
    // 0-1-many: base case (no vowels or consonants)
    assert.deepStrictEqual(count_consonants(explode("")), -1n);
    assert.deepStrictEqual(count_consonants(explode("_")), -1n);

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(count_consonants(explode("say")), 1n);
    assert.deepStrictEqual(count_consonants(explode("l_")), -1n);

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(count_consonants(explode("stingray")), 2n);
    assert.deepStrictEqual(count_consonants(explode("stray")), 3n);
    assert.deepStrictEqual(count_consonants(explode("str")), -1n);
    assert.deepStrictEqual(count_consonants(explode("st_a")), -1n);
  });

  // TODO: uncomment the following tests when you are ready to test your
  // Worm Latin functions. You'll need to import these functions.

  // Note: these are just a subset of tests to get you started. We will have
  // additional staff tests, some of which will be hidden. Please add tests/
  // reason through your code carefully to be confident it's correct, even
  // though we will not be grading it!

  it("worm_latin_encode", function () {
    // assert.deepStrictEqual(compact(worm_latin_encode(explode(""))), "");
    // assert.deepStrictEqual(compact(worm_latin_encode(explode("bird"))), "");
    // assert.deepStrictEqual(compact(worm_latin_encode(explode("elf"))), "weormlf");
    // assert.deepStrictEqual(compact(worm_latin_encode(explode("autumn"))), "waormutumn");
    // assert.deepStrictEqual(compact(worm_latin_encode(explode("thing"))), "ingthorm");
    // assert.deepStrictEqual(compact(worm_latin_encode(explode("stray"))), "aystrorm");
    // assert.deepStrictEqual(compact(worm_latin_encode(explode("kevin"))), "evinkorm");
  });

  it("worm_latin_decode", function () {
    assert.deepStrictEqual(compact(worm_latin_decode(explode(""))), "bird");
    assert.deepStrictEqual(
      compact(worm_latin_decode(explode("woormrm"))),
      "orm"
    );
    assert.deepStrictEqual(
      compact(worm_latin_decode(explode("ameshorm"))),
      "shame"
    );
    assert.deepStrictEqual(
      compact(worm_latin_decode(explode("entorm"))),
      "nte"
    );
    assert.deepStrictEqual(
      compact(worm_latin_decode(explode("james"))),
      "james"
    );
    assert.deepStrictEqual(
      compact(worm_latin_decode(explode("ateorm"))),
      "ateorm"
    );
    assert.deepStrictEqual(
      compact(worm_latin_decode(explode("storm"))),
      "storm"
    );
  });
});
