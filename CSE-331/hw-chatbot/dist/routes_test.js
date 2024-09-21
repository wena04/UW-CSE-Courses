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
    it("chat", function () {
        // First branch, straight line code, error case (only one possible input)
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/",
            query: {},
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.chat)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "message" was missing');
        // Second branch, straight line code
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/",
            query: { message: "I hate computers." },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.chat)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), {
            response: "Do computers worry you?",
        });
        const req3 = httpMocks.createRequest({
            method: "GET",
            url: "/",
            query: { message: "Are you alive" },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.chat)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 200);
        assert.deepStrictEqual(res3._getData(), {
            response: "Why are you interested in whether I am alive or not?",
        });
    });
    it("save", function () {
        // First branch, straight line code, error case
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: 1086, value: "some stuff" },
        });
        const res = httpMocks.createResponse();
        (0, routes_1.save)(req, res);
        assert.deepStrictEqual(res._getStatusCode(), 400);
        assert.deepStrictEqual(res._getData(), 'required argument "name" was missing');
        const req1 = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { value: "some stuff" },
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.save)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "name" was missing');
        // Second branch, straight line code, error case
        const req2 = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: "A" },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.save)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'required argument "value" was missing');
        const req3 = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: "L" },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.save)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'required argument "value" was missing');
        // Third branch, straight line code
        const req4 = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: "A", value: "some stuff" },
        });
        const res4 = httpMocks.createResponse();
        (0, routes_1.save)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 200);
        assert.deepStrictEqual(res4._getData(), { replaced: false });
        const req5 = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: "A", value: "different stuff" },
        });
        const res5 = httpMocks.createResponse();
        (0, routes_1.save)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { replaced: true });
        // Called to clear all saved transcripts created in this test
        //    to not effect future tests
        (0, routes_1.resetTranscriptsForTesting)();
    });
    it("load", function () {
        // TODO (5c): write tests for load
        //  - note that you will need to make requests to 'save' in order for there
        //    to be transcripts for load to retrieve (see example below)
        // - You should write tests using our usual branching heuristics (including
        //   all error case branches)
        // Example test:
        // First need to save something in order to load it
        const saveReq = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: "key", value: "transcript value" },
        });
        const saveResp = httpMocks.createResponse();
        (0, routes_1.save)(saveReq, saveResp);
        // httpMocks lets us create mock Request and Response params to pass into
        // our route functions
        const loadReq = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST
        { method: "GET", url: "/load", query: { name: "key" } });
        const loadRes = httpMocks.createResponse();
        // call our function to execute the request and fill in the response
        (0, routes_1.load)(loadReq, loadRes);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadRes._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes._getData(), { value: "transcript value" });
        // Testing with the conditional herustics
        // When input for name is not a string or the name parameter is missing
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/load",
            query: {},
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.load)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "name" was missing');
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/load",
            query: { name: 1086 },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.load)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'required argument "name" was missing');
        const req3 = httpMocks.createRequest({
            method: "GET",
            url: "/load",
            query: { name: true },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.load)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'required argument "name" was missing');
        // When the transcript is not found/missing/unexisiting transcript
        const req4 = httpMocks.createRequest({
            method: "GET",
            url: "/load",
            query: { name: "nonexistent" },
        });
        const res4 = httpMocks.createResponse();
        (0, routes_1.load)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 404);
        assert.deepStrictEqual(res4._getData(), "transcript not found");
        const saveReq5 = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: "test", value: "transcript value5" },
        });
        const saveResp5 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq5, saveResp5);
        const req5 = httpMocks.createRequest({
            method: "GET",
            url: "/load",
            query: { name: "test" },
        });
        const res5 = httpMocks.createResponse();
        (0, routes_1.load)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { value: "transcript value5" });
        //when everything works and all info are correctly provided
        const saveReq3 = httpMocks.createRequest({
            method: "POST",
            url: "/save",
            body: { name: "test", value: "transcript value3" },
        });
        const saveResp3 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq3, saveResp3);
        const loadReq3 = httpMocks.createRequest({
            method: "GET",
            url: "/load",
            query: { name: "test" },
        });
        const loadRes3 = httpMocks.createResponse();
        (0, routes_1.load)(loadReq3, loadRes3);
        assert.strictEqual(loadRes3._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes3._getData(), { value: "transcript value3" });
        // Called to clear all saved transcripts created in this test
        //    to not effect future tests
        (0, routes_1.resetTranscriptsForTesting)();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQXdFO0FBRXhFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDakIsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUNULHlFQUF5RTtRQUN6RSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxLQUFLO1lBQ2IsR0FBRyxFQUFFLEdBQUc7WUFDUixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGFBQUksRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGVBQWUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLHlDQUF5QyxDQUMxQyxDQUFDO1FBRUYsb0NBQW9DO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsR0FBRztZQUNSLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRTtTQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELE1B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