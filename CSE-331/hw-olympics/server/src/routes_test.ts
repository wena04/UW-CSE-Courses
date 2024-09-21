import * as assert from "assert";
import * as httpMocks from "node-mocks-http";
import {
  listEvents,
  addEvent,
  reserveTickets,
  getEventDetails,
  listRankedEvents,
  resetForTesting,
} from "./routes";

describe("routes", function () {
  // Test cases for the addEvent route
  it("addEvent", function () {
    // 1. Missing name
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {},
    });
    const res1 = httpMocks.createResponse();
    addEvent(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), "Missing 'name' parameter");

    // 2. Missing sport
    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: { name: "100m Race" },
    });
    const res2 = httpMocks.createResponse();
    addEvent(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), "Missing 'sport' parameter");

    // 3. Missing description
    const req3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: { name: "100m Race", sport: "Athletics" },
    });
    const res3 = httpMocks.createResponse();
    addEvent(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), "Missing 'description' parameter");

    // 4. Invalid date
    const req4 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Race",
        sport: "Athletics",
        description: "Men's 100m final",
        date: 0,
      },
    });
    const res4 = httpMocks.createResponse();
    addEvent(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(
      res4._getData(),
      "Invalid date, date should be between 1 and 31"
    );

    // 5. Missing venue
    const req5 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Race",
        sport: "Athletics",
        description: "Men's 100m final",
        date: 10,
      },
    });
    const res5 = httpMocks.createResponse();
    addEvent(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), "Missing 'venue' parameter");

    // 6. Invalid maxTickets
    const req6 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Race",
        sport: "Athletics",
        description: "Men's 100m final",
        date: 10,
        venue: "Olympic Stadium",
        maxTickets: 0,
      },
    });
    const res6 = httpMocks.createResponse();
    addEvent(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(
      res6._getData(),
      "'maxTickets' is not a positive integer: 0"
    );

    // 7. Successfully added event
    const req7 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Race",
        sport: "Athletics",
        description: "Men's 100m final",
        date: 10,
        venue: "Olympic Stadium",
        maxTickets: 10000,
      },
    });
    const res7 = httpMocks.createResponse();
    addEvent(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 200);
    assert.deepStrictEqual(res7._getData().name, "100m Race");
    assert.deepStrictEqual(res7._getData().sport, "Athletics");
    assert.deepStrictEqual(res7._getData().maxTickets, 10000);

    resetForTesting();
  });

  // Test cases for the reserveTickets route
  it("reserveTickets", function () {
    // 1. Add a valid event first
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Race",
        sport: "Athletics",
        description: "Men's 100m final",
        date: 10,
        venue: "Olympic Stadium",
        maxTickets: 10000,
      },
    });
    const res1 = httpMocks.createResponse();
    addEvent(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);

    // 2. Reserve tickets with an invalid number of tickets
    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/reserve",
      body: { name: "100m Race", reserverName: "John", numTickets: 20000 },
    });
    const res2 = httpMocks.createResponse();
    reserveTickets(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), "Invalid number of tickets");

    // 3. Successfully reserve tickets
    const req3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/reserve",
      body: { name: "100m Race", reserverName: "John", numTickets: 5000 },
    });
    const res3 = httpMocks.createResponse();
    reserveTickets(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData().event.reservedTickets, 5000);
    assert.deepStrictEqual(res3._getData().event.ticketsSold, 5000);

    resetForTesting();
  });

  // Test cases for the getEventDetails route
  it("getEventDetails", function () {
    // 1. Add a valid event first
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Race",
        sport: "Athletics",
        description: "Men's 100m final",
        date: 10,
        venue: "Olympic Stadium",
        maxTickets: 10000,
      },
    });
    const res1 = httpMocks.createResponse();
    addEvent(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);

    // 2. Get details for an existing event
    const req2 = httpMocks.createRequest({
      method: "GET",
      url: "/api/get",
      query: { name: "100m Race" },
    });
    const res2 = httpMocks.createResponse();
    getEventDetails(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData().event.name, "100m Race");

    // 3. Get details for a non-existing event
    const req3 = httpMocks.createRequest({
      method: "GET",
      url: "/api/get",
      query: { name: "200m Race" },
    });
    const res3 = httpMocks.createResponse();
    getEventDetails(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 404);
    assert.deepStrictEqual(res3._getData(), "No event with name '200m Race'");

    resetForTesting();
  });

  // Test cases for the listRankedEvents route
  it("listRankedEvents", function () {
    // Add the first event
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Sprint",
        sport: "Track",
        description: "Men's 100m sprint final",
        date: 1,
        venue: "Olympic Stadium",
        maxTickets: 10000,
      },
    });
    const res1 = httpMocks.createResponse();
    addEvent(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);

    // Add the second event
    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "200m Dash",
        sport: "Track",
        description: "Men's 200m dash final",
        date: 5,
        venue: "Olympic Stadium",
        maxTickets: 8000,
      },
    });
    const res2 = httpMocks.createResponse();
    addEvent(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);

    // Add the third event
    const req3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "Long Jump",
        sport: "Field",
        description: "Men's long jump final",
        date: 3,
        venue: "Olympic Stadium",
        maxTickets: 6000,
      },
    });
    const res3 = httpMocks.createResponse();
    addEvent(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);

    // Simulate reserving tickets for the events
    const reserve1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/reserve",
      body: {
        name: "100m Sprint",
        reserverName: "John Doe",
        numTickets: 5000,
      },
    });
    const resReserve1 = httpMocks.createResponse();
    reserveTickets(reserve1, resReserve1);
    assert.strictEqual(resReserve1._getStatusCode(), 200);

    const reserve2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/reserve",
      body: {
        name: "200m Dash",
        reserverName: "Jane Doe",
        numTickets: 8000,
      },
    });
    const resReserve2 = httpMocks.createResponse();
    reserveTickets(reserve2, resReserve2);
    assert.strictEqual(resReserve2._getStatusCode(), 200);

    const reserve3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/reserve",
      body: {
        name: "Long Jump",
        reserverName: "Alice Doe",
        numTickets: 3000,
      },
    });
    const resReserve3 = httpMocks.createResponse();
    reserveTickets(reserve3, resReserve3);
    assert.strictEqual(resReserve3._getStatusCode(), 200);

    // Fetch ranked events
    const req4 = httpMocks.createRequest({
      method: "GET",
      url: "/api/ranked",
    });
    const res4 = httpMocks.createResponse();
    listRankedEvents(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 200);

    // Check the sorted order
    assert.deepStrictEqual(res4._getData(), {
      events: [
        {
          name: "200m Dash",
          sport: "Track",
          description: "Men's 200m dash final",
          date: 5,
          venue: "Olympic Stadium",
          maxTickets: 8000,
          reservedTickets: 8000,
          ticketsSold: 8000,
          reserverName: "Jane Doe",
        },
        {
          name: "100m Sprint",
          sport: "Track",
          description: "Men's 100m sprint final",
          date: 1,
          venue: "Olympic Stadium",
          maxTickets: 10000,
          reservedTickets: 5000,
          ticketsSold: 5000,
          reserverName: "John Doe",
        },
        {
          name: "Long Jump",
          sport: "Field",
          description: "Men's long jump final",
          date: 3,
          venue: "Olympic Stadium",
          maxTickets: 6000,
          reservedTickets: 3000,
          ticketsSold: 3000,
          reserverName: "Alice Doe",
        },
      ],
    });

    resetForTesting();
  });

  // Test cases for the listEvents route
  it("listEvents", function () {
    // 1. Initially empty list
    const req1 = httpMocks.createRequest({
      method: "GET",
      url: "/api/list",
    });
    const res1 = httpMocks.createResponse();
    listEvents(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), { events: [] });

    // 2. Add some events
    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "100m Race",
        sport: "Athletics",
        description: "Men's 100m final",
        date: 1,
        venue: "Olympic Stadium",
        maxTickets: 10000,
      },
    });
    const res2 = httpMocks.createResponse();
    addEvent(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);

    const req3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "200m Race",
        sport: "Athletics",
        description: "Men's 200m final",
        date: 5,
        venue: "Olympic Stadium",
        maxTickets: 8000,
      },
    });
    const res3 = httpMocks.createResponse();
    addEvent(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);

    const req4 = httpMocks.createRequest({
      method: "POST",
      url: "/api/add",
      body: {
        name: "Long Jump",
        sport: "Athletics",
        description: "Men's Long Jump final",
        date: 3,
        venue: "Olympic Stadium",
        maxTickets: 6000,
      },
    });
    const res4 = httpMocks.createResponse();
    addEvent(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 200);

    // 3. Get the list of events, expect them in chronological order
    const req5 = httpMocks.createRequest({
      method: "GET",
      url: "/api/list",
    });
    const res5 = httpMocks.createResponse();
    listEvents(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 200);
    assert.strictEqual(res5._getData().events.length, 3);
    assert.deepStrictEqual(res5._getData().events[0].name, "100m Race");
    assert.deepStrictEqual(res5._getData().events[1].name, "Long Jump");
    assert.deepStrictEqual(res5._getData().events[2].name, "200m Race");

    resetForTesting();
  });
});
