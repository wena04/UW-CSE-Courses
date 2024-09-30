import * as assert from 'assert';
import { nil, cons, len, equal, concat, rev, compact_list, explode_array } from './list';


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

  it('equal', function() {
    // 0-1-many: 0 recursive calls - first branch
    assert.deepStrictEqual(equal(nil, nil), true);
    assert.deepStrictEqual(equal(nil, cons(1n, nil)), false);
    // 0-1-many: 0 recursive calls - second branch
    assert.deepStrictEqual(equal(cons(1n, nil), nil), false);
    assert.deepStrictEqual(equal(cons(1n, cons(2n, nil)), nil), false);
    // 0-1-many: 0 recursive calls - third branch
    assert.deepStrictEqual(equal(cons(1n, nil), cons(2n, nil)), false);
    assert.deepStrictEqual(equal(cons(7n, nil), cons(1n, cons(2n, nil))), false);

    // 0-1-many: 1 recursive call - path ends in first branch
    assert.deepStrictEqual(equal(cons(3n, nil), cons(3n, nil)), true);
    assert.deepStrictEqual(equal(cons(5n, nil), cons(5n, cons(1n, nil))), false);
    // 0-1-many: 1 recursive call - path ends in second branch
    assert.deepStrictEqual(equal(cons(4n, cons(1n, nil)), cons(4n, nil)), false);
    assert.deepStrictEqual(
        equal(cons(6n, cons(1n, cons(2n, nil))), cons(6n, nil)), false);
    // 0-1-many: 1 recursive call - path ends in third branch
    assert.deepStrictEqual(
        equal(cons(5n, cons(1n, nil)), cons(5n, cons(2n, nil))), false);
    assert.deepStrictEqual(
        equal(cons(9n, cons(3n, nil)), cons(9n, cons(4n, cons(2n, nil)))), false);

    // 0-1-many: 2 recursive calls
    assert.deepStrictEqual(
        equal(cons(4n, cons(3n, nil)), cons(4n, cons(3n, nil))), true);
    assert.deepStrictEqual(
        equal(cons(7n, cons(6n, cons(1n, cons(4n, nil)))), cons(7n, cons(6n, cons(1n, cons(4n, nil))))), true);
    assert.deepStrictEqual(
        equal(cons(4n, cons(3n, cons(2n, nil))), cons(4n, cons(3n, cons(1n, cons(2n, nil))))), false);
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
    // 0-1-many: base case (only 1 possible)
    assert.deepStrictEqual(rev(nil), nil);
    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(rev(cons(1n, nil)), cons(1n, nil));
    assert.deepStrictEqual(rev(cons(2n, nil)), cons(2n, nil));
    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(rev(cons(1n, cons(2n, nil))), cons(2n, cons(1n, nil)));
    assert.deepStrictEqual(rev(cons(1n, cons(2n, cons(3n, nil)))),
        cons(3n, cons(2n, cons(1n, nil))));
  });

  it('compact_list', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepStrictEqual(compact_list(nil), []);
    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(compact_list(cons(1n, nil)), [1n]);
    assert.deepStrictEqual(compact_list(cons(8n, nil)), [8n]);
    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(compact_list(cons(1n, cons(2n, nil))), [1n, 2n]);
    assert.deepStrictEqual(compact_list(cons(3n, cons(2n, cons(1n, nil)))), [3n, 2n, 1n]);
  });

  it('explode_array', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepStrictEqual(explode_array([]), nil);
    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(explode_array([1n]), cons(1n, nil));
    assert.deepStrictEqual(explode_array([8n]), cons(8n, nil));
    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(explode_array([1n, 2n]), cons(1n, cons(2n, nil)));
    assert.deepStrictEqual(explode_array([1n, 2n, 3n]), cons(1n, cons(2n, cons(3n, nil))));
  });

});