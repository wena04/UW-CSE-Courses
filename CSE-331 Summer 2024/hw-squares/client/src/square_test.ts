import * as assert from "assert";
import { solid, split, toJson, fromJson, find, replace } from "./square";
import { cons, nil } from "./list";

describe("square", function () {
  it("toJson", function () {
    assert.deepStrictEqual(toJson(solid("white")), "white");
    assert.deepStrictEqual(toJson(solid("green")), "green");

    const s1 = split(
      solid("blue"),
      solid("orange"),
      solid("purple"),
      solid("white")
    );
    assert.deepStrictEqual(toJson(s1), ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepStrictEqual(toJson(s2), [
      ["blue", "orange", "purple", "white"],
      "green",
      ["blue", "orange", "purple", "white"],
      "red",
    ]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepStrictEqual(toJson(s3), [
      "green",
      ["blue", "orange", "purple", "white"],
      "yellow",
      ["blue", "orange", "purple", "white"],
    ]);
  });

  it("fromJson", function () {
    assert.deepStrictEqual(fromJson("white"), solid("white"));
    assert.deepStrictEqual(fromJson("green"), solid("green"));

    const s1 = split(
      solid("blue"),
      solid("orange"),
      solid("purple"),
      solid("white")
    );
    assert.deepStrictEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepStrictEqual(
      fromJson([
        ["blue", "orange", "purple", "white"],
        "green",
        ["blue", "orange", "purple", "white"],
        "red",
      ]),
      split(s1, solid("green"), s1, solid("red"))
    );

    assert.deepStrictEqual(
      fromJson([
        "green",
        ["blue", "orange", "purple", "white"],
        "yellow",
        ["blue", "orange", "purple", "white"],
      ]),
      split(solid("green"), s1, solid("yellow"), s1)
    );
  });

  it("find", function () {
    // 0-1-many: base case, 0 recursive calls/returns root immediately since no path
    const solidSquare = solid("blue");
    assert.deepStrictEqual(find(nil, solidSquare), solidSquare);
    const nestedSquare = split(
      solid("blue"),
      solid("orange"),
      split(solid("green"), solid("yellow"), solid("purple"), solid("white")),
      solid("red")
    );
    assert.deepStrictEqual(find(nil, nestedSquare), nestedSquare);
    // Test invalid paths that should throw an error
    assert.throws(() => find(cons("NW", cons("NW", nil)), nestedSquare), Error);
    assert.throws(() => find(cons("NE", cons("SE", nil)), nestedSquare), Error);

    // 1 recursive call: Simple case with one direction/one element in path
    assert.deepStrictEqual(find(cons("NW", nil), nestedSquare), solid("blue"));
    assert.deepStrictEqual(
      find(cons("NE", nil), nestedSquare),
      solid("orange")
    );
    assert.deepStrictEqual(find(cons("SE", nil), nestedSquare), solid("red"));

    // 2+ recursive calls: More complex cases with multiple directions in paths
    assert.deepStrictEqual(
      find(cons("SW", cons("NW", nil)), nestedSquare),
      solid("green")
    );
    assert.deepStrictEqual(
      find(cons("SW", cons("NE", nil)), nestedSquare),
      solid("yellow")
    );
    assert.deepStrictEqual(
      find(cons("SW", cons("SW", nil)), nestedSquare),
      solid("purple")
    );
    assert.deepStrictEqual(
      find(cons("SW", cons("SE", nil)), nestedSquare),
      solid("white")
    );
  });

  it("replace", function () {
    // 0-1-many: base case, 0 recursive calls/throws errors/replacing root itself
    const solidSquare = solid("blue");
    const newSolidSquare = solid("red");
    assert.deepStrictEqual(
      replace(nil, solidSquare, newSolidSquare),
      newSolidSquare
    );

    const nestedSquare = split(
      solid("blue"),
      solid("orange"),
      split(solid("green"), solid("yellow"), solid("purple"), solid("white")),
      solid("red")
    );

    // Test invalid paths that should throw an error
    assert.throws(
      () => replace(cons("NW", cons("NW", nil)), nestedSquare, newSolidSquare),
      Error
    );
    assert.throws(
      () => replace(cons("NE", cons("SE", nil)), nestedSquare, newSolidSquare),
      Error
    );

    // 1 recursive call: Simple case with one direction/one element in path
    const replacedNW = replace(cons("NW", nil), nestedSquare, newSolidSquare);
    assert.deepStrictEqual(
      replacedNW,
      split(
        newSolidSquare,
        solid("orange"),
        split(solid("green"), solid("yellow"), solid("purple"), solid("white")),
        solid("red")
      )
    );
    const replacedNE = replace(cons("NE", nil), nestedSquare, newSolidSquare);
    assert.deepStrictEqual(
      replacedNE,
      split(
        solid("blue"),
        newSolidSquare,
        split(solid("green"), solid("yellow"), solid("purple"), solid("white")),
        solid("red")
      )
    );
    const replacedSE = replace(cons("SE", nil), nestedSquare, newSolidSquare);
    assert.deepStrictEqual(
      replacedSE,
      split(
        solid("blue"),
        solid("orange"),
        split(solid("green"), solid("yellow"), solid("purple"), solid("white")),
        newSolidSquare
      )
    );

    // 2+ recursive calls: More complex cases with multiple directions in paths
    const replacedSW_NE = replace(
      cons("SW", cons("NE", nil)),
      nestedSquare,
      newSolidSquare
    );
    assert.deepStrictEqual(
      replacedSW_NE,
      split(
        solid("blue"),
        solid("orange"),
        split(solid("green"), newSolidSquare, solid("purple"), solid("white")),
        solid("red")
      )
    );

    const replacedSW_SW = replace(
      cons("SW", cons("SW", nil)),
      nestedSquare,
      newSolidSquare
    );
    assert.deepStrictEqual(
      replacedSW_SW,
      split(
        solid("blue"),
        solid("orange"),
        split(solid("green"), solid("yellow"), newSolidSquare, solid("white")),
        solid("red")
      )
    );
  });
});
