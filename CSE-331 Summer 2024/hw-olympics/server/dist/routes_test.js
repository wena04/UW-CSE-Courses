"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
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
        (0, routes_1.addEvent)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), "Missing 'name' parameter");
        // 2. Missing sport
        const req2 = httpMocks.createRequest({
            method: "POST",
            url: "/api/add",
            body: { name: "100m Race" },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.addEvent)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), "Missing 'sport' parameter");
        // 3. Missing description
        const req3 = httpMocks.createRequest({
            method: "POST",
            url: "/api/add",
            body: { name: "100m Race", sport: "Athletics" },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.addEvent)(req3, res3);
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
        (0, routes_1.addEvent)(req4, res4);
        assert.strictEqual(res4._getStatusCode(), 400);
        assert.deepStrictEqual(res4._getData(), "Invalid date, date should be between 1 and 31");
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
        (0, routes_1.addEvent)(req5, res5);
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
        (0, routes_1.addEvent)(req6, res6);
        assert.strictEqual(res6._getStatusCode(), 400);
        assert.deepStrictEqual(res6._getData(), "'maxTickets' is not a positive integer: 0");
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
        (0, routes_1.addEvent)(req7, res7);
        assert.strictEqual(res7._getStatusCode(), 200);
        assert.deepStrictEqual(res7._getData().name, "100m Race");
        assert.deepStrictEqual(res7._getData().sport, "Athletics");
        assert.deepStrictEqual(res7._getData().maxTickets, 10000);
        (0, routes_1.resetForTesting)();
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
        (0, routes_1.addEvent)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 200);
        // 2. Reserve tickets with an invalid number of tickets
        const req2 = httpMocks.createRequest({
            method: "POST",
            url: "/api/reserve",
            body: { name: "100m Race", reserverName: "John", numTickets: 20000 },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.reserveTickets)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), "Invalid number of tickets");
        // 3. Successfully reserve tickets
        const req3 = httpMocks.createRequest({
            method: "POST",
            url: "/api/reserve",
            body: { name: "100m Race", reserverName: "John", numTickets: 5000 },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.reserveTickets)(req3, res3);
        assert.strictEqual(res3._getStatusCode(), 200);
        assert.deepStrictEqual(res3._getData().event.reservedTickets, 5000);
        assert.deepStrictEqual(res3._getData().event.ticketsSold, 5000);
        (0, routes_1.resetForTesting)();
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
        (0, routes_1.addEvent)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 200);
        // 2. Get details for an existing event
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/api/get",
            query: { name: "100m Race" },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.getEventDetails)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData().event.name, "100m Race");
        // 3. Get details for a non-existing event
        const req3 = httpMocks.createRequest({
            method: "GET",
            url: "/api/get",
            query: { name: "200m Race" },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.getEventDetails)(req3, res3);
        assert.strictEqual(res3._getStatusCode(), 404);
        assert.deepStrictEqual(res3._getData(), "No event with name '200m Race'");
        (0, routes_1.resetForTesting)();
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
        (0, routes_1.addEvent)(req1, res1);
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
        (0, routes_1.addEvent)(req2, res2);
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
        (0, routes_1.addEvent)(req3, res3);
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
        (0, routes_1.reserveTickets)(reserve1, resReserve1);
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
        (0, routes_1.reserveTickets)(reserve2, resReserve2);
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
        (0, routes_1.reserveTickets)(reserve3, resReserve3);
        assert.strictEqual(resReserve3._getStatusCode(), 200);
        // Fetch ranked events
        const req4 = httpMocks.createRequest({
            method: "GET",
            url: "/api/ranked",
        });
        const res4 = httpMocks.createResponse();
        (0, routes_1.listRankedEvents)(req4, res4);
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
        (0, routes_1.resetForTesting)();
    });
    // Test cases for the listEvents route
    it("listEvents", function () {
        // 1. Initially empty list
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/api/list",
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.listEvents)(req1, res1);
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
        (0, routes_1.addEvent)(req2, res2);
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
        (0, routes_1.addEvent)(req3, res3);
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
        (0, routes_1.addEvent)(req4, res4);
        assert.strictEqual(res4._getStatusCode(), 200);
        // 3. Get the list of events, expect them in chronological order
        const req5 = httpMocks.createRequest({
            method: "GET",
            url: "/api/list",
        });
        const res5 = httpMocks.createResponse();
        (0, routes_1.listEvents)(req5, res5);
        assert.strictEqual(res5._getStatusCode(), 200);
        assert.strictEqual(res5._getData().events.length, 3);
        assert.deepStrictEqual(res5._getData().events[0].name, "100m Race");
        assert.deepStrictEqual(res5._getData().events[1].name, "Long Jump");
        assert.deepStrictEqual(res5._getData().events[2].name, "200m Race");
        (0, routes_1.resetForTesting)();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBT2tCO0FBRWxCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDakIsb0NBQW9DO0lBQ3BDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7UUFDYixrQkFBa0I7UUFDbEIsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxVQUFVO1lBQ2YsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBRXBFLG1CQUFtQjtRQUNuQixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO1NBQzVCLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFFckUseUJBQXlCO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtTQUNoRCxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1FBRTNFLGtCQUFrQjtRQUNsQixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixJQUFJLEVBQUUsQ0FBQzthQUNSO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLCtDQUErQyxDQUNoRCxDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLElBQUksRUFBRSxFQUFFO2FBQ1Q7U0FDRixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBRXJFLHdCQUF3QjtRQUN4QixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixJQUFJLEVBQUUsRUFBRTtnQkFDUixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixVQUFVLEVBQUUsQ0FBQzthQUNkO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLDJDQUEyQyxDQUM1QyxDQUFDO1FBRUYsOEJBQThCO1FBQzlCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLElBQUksRUFBRSxFQUFFO2dCQUNSLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFVBQVUsRUFBRSxLQUFLO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFMUQsSUFBQSx3QkFBZSxHQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCwwQ0FBMEM7SUFDMUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1FBQ25CLDZCQUE2QjtRQUM3QixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixJQUFJLEVBQUUsRUFBRTtnQkFDUixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixVQUFVLEVBQUUsS0FBSzthQUNsQjtTQUNGLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLHVEQUF1RDtRQUN2RCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLGNBQWM7WUFDbkIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7U0FDckUsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsdUJBQWMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUVyRSxrQ0FBa0M7UUFDbEMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxjQUFjO1lBQ25CLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO1NBQ3BFLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLHVCQUFjLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRSxJQUFBLHdCQUFlLEdBQUUsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILDJDQUEyQztJQUMzQyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7UUFDcEIsNkJBQTZCO1FBQzdCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLElBQUksRUFBRSxFQUFFO2dCQUNSLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFVBQVUsRUFBRSxLQUFLO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFL0MsdUNBQXVDO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsVUFBVTtZQUNmLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7U0FDN0IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsd0JBQWUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVoRSwwQ0FBMEM7UUFDMUMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRSxVQUFVO1lBQ2YsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtTQUM3QixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSx3QkFBZSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO1FBRTFFLElBQUEsd0JBQWUsR0FBRSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsNENBQTRDO0lBQzVDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRTtRQUNyQixzQkFBc0I7UUFDdEIsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxVQUFVO1lBQ2YsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxhQUFhO2dCQUNuQixLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixVQUFVLEVBQUUsS0FBSzthQUNsQjtTQUNGLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLHVCQUF1QjtRQUN2QixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFL0Msc0JBQXNCO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsVUFBVSxFQUFFLElBQUk7YUFDakI7U0FDRixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUvQyw0Q0FBNEM7UUFDNUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUN2QyxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxjQUFjO1lBQ25CLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9DLElBQUEsdUJBQWMsRUFBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdEQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUN2QyxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxjQUFjO1lBQ25CLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9DLElBQUEsdUJBQWMsRUFBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdEQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUN2QyxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxjQUFjO1lBQ25CLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsWUFBWSxFQUFFLFdBQVc7Z0JBQ3pCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9DLElBQUEsdUJBQWMsRUFBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdEQsc0JBQXNCO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsYUFBYTtTQUNuQixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSx5QkFBZ0IsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFL0MseUJBQXlCO1FBQ3pCLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sRUFBRTtnQkFDTjtvQkFDRSxJQUFJLEVBQUUsV0FBVztvQkFDakIsS0FBSyxFQUFFLE9BQU87b0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtvQkFDcEMsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGVBQWUsRUFBRSxJQUFJO29CQUNyQixXQUFXLEVBQUUsSUFBSTtvQkFDakIsWUFBWSxFQUFFLFVBQVU7aUJBQ3pCO2dCQUNEO29CQUNFLElBQUksRUFBRSxhQUFhO29CQUNuQixLQUFLLEVBQUUsT0FBTztvQkFDZCxXQUFXLEVBQUUseUJBQXlCO29CQUN0QyxJQUFJLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixVQUFVLEVBQUUsS0FBSztvQkFDakIsZUFBZSxFQUFFLElBQUk7b0JBQ3JCLFdBQVcsRUFBRSxJQUFJO29CQUNqQixZQUFZLEVBQUUsVUFBVTtpQkFDekI7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLEtBQUssRUFBRSxPQUFPO29CQUNkLFdBQVcsRUFBRSx1QkFBdUI7b0JBQ3BDLElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixlQUFlLEVBQUUsSUFBSTtvQkFDckIsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLFlBQVksRUFBRSxXQUFXO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBQSx3QkFBZSxHQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxzQ0FBc0M7SUFDdEMsRUFBRSxDQUFDLFlBQVksRUFBRTtRQUNmLDBCQUEwQjtRQUMxQixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxLQUFLO1lBQ2IsR0FBRyxFQUFFLFdBQVc7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsbUJBQVUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV4RCxxQkFBcUI7UUFDckIsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxVQUFVO1lBQ2YsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsV0FBVztnQkFDbEIsV0FBVyxFQUFFLGtCQUFrQjtnQkFDL0IsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsVUFBVSxFQUFFLEtBQUs7YUFDbEI7U0FDRixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUvQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixVQUFVLEVBQUUsSUFBSTthQUNqQjtTQUNGLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFL0MsZ0VBQWdFO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsV0FBVztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxtQkFBVSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBFLElBQUEsd0JBQWUsR0FBRSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==