import * as assert from 'assert';
import React from 'react';
import { Color } from './color';
import { List ,nil, explode_array } from './list';
import { DrawWeaveRowColors, DrawWeaveRow, DrawWeave, Weave } from './ui';


describe('ui', function() {

  it('DrawWeaveRowColors', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(
        DrawWeaveRowColors(nil, 0),
        nil);
    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(
        DrawWeaveRowColors(explode_array(["red"]), 0),
        explode_array([
          <span className="square color-red" key={0}></span>
        ]));
    assert.deepStrictEqual(
        DrawWeaveRowColors(explode_array(["yellow"]), 0),
        explode_array([
          <span className="square color-yellow" key={0}></span>
        ]));
    // 0-1-many: many recursive calls
    assert.deepStrictEqual(
        DrawWeaveRowColors(explode_array(["blue", "red", "purple"]), 0),
        explode_array([
          <span className="square color-blue" key={0}></span>,
          <span className="square color-red" key={1}></span>,
          <span className="square color-purple" key={2}></span>
        ]));
    assert.deepStrictEqual(
        DrawWeaveRowColors(explode_array(["red", "green", "red", "green"]), 0),
        explode_array([
          <span className="square color-red" key={0}></span>,
          <span className="square color-green" key={1}></span>,
          <span className="square color-red" key={2}></span>,
          <span className="square color-green" key={3}></span>
        ]));
  });

  it('DrawWeaveRow', function() {
    // Branch 1: offset, 2 tests
    assert.deepStrictEqual(
        DrawWeaveRow(explode_array(["blue", "red", "purple"]), false, 0),
        <div key={0}>
          {[ <span className="square color-blue" key={0}></span>,
             <span className="square color-red" key={1}></span>,
             <span className="square color-purple" key={2}></span> ]}
        </div>);
    assert.deepStrictEqual(
      DrawWeaveRow(explode_array(["green", "purple"]), false, 0),
      <div key={0}>
        {[ <span className="square color-green" key={0}></span>,
           <span className="square color-purple" key={1}></span> ]}
      </div>);
    // Branch 2: no offset, 2 tests
    assert.deepStrictEqual(
      DrawWeaveRow(explode_array(["purple", "orange", "green"]), true, 1),
      <div key={1}>
        <span className="offset">&nbsp;</span>
        {[ <span className="square color-purple" key={0}></span>,
           <span className="square color-orange" key={1}></span>,
           <span className="square color-green" key={2}></span> ]}
      </div>);
    assert.deepStrictEqual(
        DrawWeaveRow(explode_array(["green", "orange"]), true, 1),
        <div key={1}>
          <span className="offset">&nbsp;</span>
          {[ <span className="square color-green" key={0}></span>,
             <span className="square color-orange" key={1}></span> ]}
        </div>);
  });

  it('DrawWeave', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(DrawWeave(nil, 0), nil);

    // 0-1-many: 1 recursive call
    const weave: List<List<Color>> = explode_array([
      explode_array(["blue"]),
    ]);
    assert.deepStrictEqual(
      DrawWeave(weave, 0),
      explode_array([
        <div key={0}>
          <span className="offset">&nbsp;</span>
          {[ <span className="square color-blue" key={0}></span> ]}
        </div>
      ]));

    const weave2: List<List<Color>> = explode_array([
      explode_array(["red", "green", "orange"]),
    ]);
    assert.deepStrictEqual(
      DrawWeave(weave2, 0),
      explode_array([
        <div key={0}>
          <span className="offset">&nbsp;</span>
          {[ <span className="square color-red" key={0}></span>,
              <span className="square color-green" key={1}></span>,
              <span className="square color-orange" key={2}></span> ]}
        </div>
      ]));

    // 0-1-many: many recursive calls
    const weave3: List<List<Color>> = explode_array([
        explode_array(["blue", "red"]),
        explode_array(["purple", "yellow"])
      ]);
    assert.deepStrictEqual(
        DrawWeave(weave3, 0),
        explode_array([
          <div key={0}>
            <span className="offset">&nbsp;</span>
            {[ <span className="square color-blue" key={0}></span>,
               <span className="square color-red" key={1}></span> ]}
          </div>,
          <div key={1}>
            {[ <span className="square color-purple" key={0}></span>,
               <span className="square color-yellow" key={1}></span> ]}
          </div>
        ]));

    const weave4: List<List<Color>> = explode_array([
      explode_array(["green", "orange"]),
      explode_array(["red"]),
      explode_array(["yellow", "blue"])
    ]);
    assert.deepStrictEqual(
          DrawWeave(weave4, 0),
          explode_array([
            <div key={0}>
              <span className="offset">&nbsp;</span>
              {[ <span className="square color-green" key={0}></span>,
                 <span className="square color-orange" key={1}></span> ]}
            </div>,
            <div key={1}>
              {[ <span className="square color-red" key={0}></span> ]}
            </div>,
            <div key={2}>
              <span className="offset">&nbsp;</span>
               {[ <span className="square color-yellow" key={0}></span>,
                 <span className="square color-blue" key={1}></span> ]}
            </div>
          ]));
  });

  it('Weave', function() {
    // Straight-line code: 2 tests
    assert.deepEqual(
      Weave({
        colors: explode_array(["green", "orange", "yellow"]), rows: 4n
      }),
      <div>{[
        <div key={0}>
          <span className="offset">&nbsp;</span>
          {[ <span className="square color-orange" key={0}></span>,  ]}
        </div>,
        <div key={1}>
          {[ <span className="square color-green" key={0}></span>,
              <span className="square color-yellow" key={1}></span>, ]}
        </div>,
        <div key={2}>
          <span className="offset">&nbsp;</span>
          {[ <span className="square color-orange" key={0}></span>,  ]}
        </div>,
        <div key={3}>
          {[ <span className="square color-green" key={0}></span>,
              <span className="square color-yellow" key={1}></span>, ]}
        </div>
      ]}</div>);
    assert.deepEqual(
      Weave({
        colors: explode_array(["blue", "red", "purple", "yellow"]), rows: 2n
      }),
      <div>{[
        <div key={0}>
          <span className="offset">&nbsp;</span>
          {[ <span className="square color-red" key={0}></span>,  
            <span className="square color-yellow" key={1}></span>]}
        </div>,
        <div key={1}>
          {[ <span className="square color-blue" key={0}></span>,
              <span className="square color-purple" key={1}></span>, ]}
        </div>
      ]}</div>);
  });

});