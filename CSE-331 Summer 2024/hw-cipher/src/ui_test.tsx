import React from 'react';
import * as assert from 'assert';
import { ShowResult } from './ui';


describe('ui', function() {

  it('ShowResult', function() {
    assert.deepStrictEqual(
      ShowResult({word: "hut", algo: "cipher", op: "encode"}),
      <p><code>rop</code></p>);

    assert.deepStrictEqual(
      ShowResult({word: "crazy", algo: "crazy-caps", op: "encode"}),
      <p><code>crAzy</code></p>);

    assert.deepStrictEqual(
      ShowResult({word: "worm", algo: "worm-latin", op: "encode"}),
      <p><code>ormworm</code></p>);

    // Note that these are not enough tests according to our heuristics
    // but we will test your code with additional tests. Feel free to
    // add more to be more confident that 'ShowResult' is correct, or
    // test thoroughly in the UI.
  });
});
