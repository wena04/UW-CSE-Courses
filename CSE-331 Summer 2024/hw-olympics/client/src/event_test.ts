import * as assert from "assert";
import { parseEvents } from "./event";

describe("event", function () {
  it("parseEvents", function () {
    // first branch: not an array
    assert.deepStrictEqual(parseEvents({}), undefined);
    assert.deepStrictEqual(parseEvents("hello"), undefined);

    // loop: 0-1-many 0 iterations (only one input)
    assert.deepStrictEqual(parseEvents([]), []);

    // loop: 0-1-many 1 iteration, first branch
    assert.deepStrictEqual(parseEvents(["hello"]), undefined);
    assert.deepStrictEqual(parseEvents([{}]), undefined);

    // loop: 0-1-many 1 iteration, second branch
    assert.deepStrictEqual(parseEvents([{ name: {} }]), undefined);
    assert.deepStrictEqual(parseEvents([{ name: "Event 1" }]), undefined);

    // loop: 0-1-many 1 iteration, third branch
    assert.deepStrictEqual(
      parseEvents([{ name: "Event 1", sport: {} }]),
      undefined
    );
    assert.deepStrictEqual(
      parseEvents([{ name: "Event 1", sport: "Sport 1" }]),
      undefined
    );

    // Valid events
    const events1: unknown[] = [
      {
        name: "Event 1",
        sport: "Sport 1",
        description: "Description 1",
        date: 1,
        venue: "Venue 1",
        maxTickets: 100,
        reservedTickets: 10,
        ticketsSold: 10,
      },
    ];
    const events2: unknown[] = [
      {
        name: "Event 2",
        sport: "Sport 2",
        description: "Description 2",
        date: 2,
        venue: "Venue 2",
        maxTickets: 200,
        reservedTickets: 20,
        ticketsSold: 20,
        reserverName: "John Doe",
      },
    ];

    // loop: 0-1-many 1 iteration, else branch
    assert.deepStrictEqual(parseEvents(events1), [
      {
        name: "Event 1",
        sport: "Sport 1",
        description: "Description 1",
        date: 1,
        venue: "Venue 1",
        maxTickets: 100,
        reservedTickets: 10,
        ticketsSold: 10,
        // No reserverName here because it's undefined
      },
    ]);
    assert.deepStrictEqual(parseEvents(events2), events2);

    const events3 = events1.concat([0]);
    const events4 = events2.concat([null]);

    // loop: 0-1-many many iterations, first branch
    assert.deepStrictEqual(parseEvents(events3), undefined);
    assert.deepStrictEqual(parseEvents(events4), undefined);

    const events5 = events1.concat([{ name: undefined }]);
    const events6 = events2.concat({ name: [] });

    // loop: 0-1-many many iterations, second branch
    assert.deepStrictEqual(parseEvents(events5), undefined);
    assert.deepStrictEqual(parseEvents(events6), undefined);

    const events7 = events1.concat([{ name: "Event 3", completed: 0 }]);
    const events8 = events2.concat({ name: "Event 4", completed: null });

    // loop: 0-1-many many iterations, third branch
    assert.deepStrictEqual(parseEvents(events7), undefined);
    assert.deepStrictEqual(parseEvents(events8), undefined);

    const events9 = events1.concat([
      {
        name: "Event 5",
        sport: "Sport 5",
        description: "Description 5",
        date: 5,
        venue: "Venue 5",
        maxTickets: 500,
        reservedTickets: 50,
        ticketsSold: 50,
      },
    ]);
    const events10 = events2.concat([
      {
        name: "Event 6",
        sport: "Sport 6",
        description: "Description 6",
        date: 6,
        venue: "Venue 6",
        maxTickets: 600,
        reservedTickets: 60,
        ticketsSold: 60,
        reserverName: "Jane Doe",
      },
    ]);

    // loop: 0-1-many many iterations, else branch
    assert.deepStrictEqual(parseEvents(events9), events9);
    assert.deepStrictEqual(parseEvents(events10), events10);
  });
});
