import * as assert from 'assert';
import { nil, cons, len, concat, rev } from './list';


describe('list', function() {

  it('len', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepStrictEqual(len(nil), 0n);

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(len(cons(1n, nil)), 1n);
    assert.deepStrictEqual(len(cons(2n, nil)), 1n);

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(len(cons(1n, cons(2n, nil))), 2n);
    assert.deepStrictEqual(len(cons(3n, cons(2n, cons(1n, cons(0n, nil))))), 4n);
  });

  it('concat', function() {
    // 0-1-many: base case, 0 recursive calls
    assert.deepStrictEqual(concat(nil, nil), nil);
    assert.deepStrictEqual(concat(nil, cons(1n, nil)), cons(1n, nil));
    assert.deepStrictEqual(concat(nil, cons(1n, cons(2n, nil))), cons(1n, cons(2n, nil)));

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(concat(cons(1n, nil), nil), cons(1n, nil));
    assert.deepStrictEqual(concat(cons(1n, nil), cons(2n, nil)), cons(1n, cons(2n, nil)));
    assert.deepStrictEqual(concat(cons(1n, nil), cons(2n, cons(3n, nil))),
        cons(1n, cons(2n, cons(3n, nil))));

    // 0-1-many: 2+ recursive call
    assert.deepStrictEqual(concat(cons(1n, cons(2n, nil)), nil), cons(1n, cons(2n, nil)));
    assert.deepStrictEqual(concat(cons(1n, cons(2n, nil)), cons(3n, nil)),
        cons(1n, cons(2n, cons(3n, nil))));
    assert.deepStrictEqual(concat(cons(1n, cons(2n, nil)), cons(3n, cons(4n, nil))),
        cons(1n, cons(2n, cons(3n, cons(4n, nil)))));
  });

  it('rev', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepStrictEqual(rev(nil), nil);

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(rev(cons(1n, nil)), cons(1n, nil));
    assert.deepStrictEqual(rev(cons(2n, nil)), cons(2n, nil));

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(rev(cons(1n, cons(2n, nil))), cons(2n, cons(1n, nil)));
    assert.deepStrictEqual(rev(cons(1n, cons(2n, cons(3n, nil)))),
        cons(3n, cons(2n, cons(1n, nil))));
  });
});
