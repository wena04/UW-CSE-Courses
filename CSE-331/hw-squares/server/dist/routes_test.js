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
    it("save", function () {
        // First branch, straight line code, error case
        const req1 = httpMocks.createRequest({
            method: "POST",
            url: "/api/save",
            body: { name: 1086, content: { kind: "solid", color: "blue" } },
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.save)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'missing "name" or "content" in parameter');
        // Second branch, straight line code, successful save
        const req2 = httpMocks.createRequest({
            method: "POST",
            url: "/api/save",
            body: { name: "testFile", content: { kind: "solid", color: "blue" } },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.save)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), { saved: true });
    });
    it("load", function () {
        // First branch, straight line code, error case: no name provided
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/api/load",
            query: {},
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.load)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'missing "name" parameter');
        // Second branch, straight line code, error case: file not found
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/api/load",
            query: { name: "nonexistent" },
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.load)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 404);
        assert.deepStrictEqual(res2._getData(), {
            message: "File nonexistent not found",
        });
        // Third branch, straight line code, successful load
        const req3 = httpMocks.createRequest({
            method: "POST",
            url: "/api/save",
            body: { name: "testFile", content: { kind: "solid", color: "blue" } },
        });
        const res3 = httpMocks.createResponse();
        (0, routes_1.save)(req3, res3);
        const loadReq = httpMocks.createRequest({
            method: "GET",
            url: "/api/load",
            query: { name: "testFile" },
        });
        const loadRes = httpMocks.createResponse();
        (0, routes_1.load)(loadReq, loadRes);
        assert.deepStrictEqual(loadRes._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes._getData(), {
            name: "testFile",
            content: { kind: "solid", color: "blue" },
        });
    });
    it("names", function () {
        // First branch, straight line code, no files in storage
        const req1 = httpMocks.createRequest({
            method: "GET",
            url: "/api/names",
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.names)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        assert.deepStrictEqual(res1._getData(), { names: [] });
        // Second branch, straight line code, multiple files in storage
        const saveReq1 = httpMocks.createRequest({
            method: "POST",
            url: "/api/save",
            body: { name: "file1", content: { kind: "solid", color: "red" } },
        });
        const saveRes1 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq1, saveRes1);
        const saveReq2 = httpMocks.createRequest({
            method: "POST",
            url: "/api/save",
            body: { name: "file2", content: { kind: "solid", color: "green" } },
        });
        const saveRes2 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq2, saveRes2);
        const req2 = httpMocks.createRequest({
            method: "GET",
            url: "/api/names",
        });
        const res2 = httpMocks.createResponse();
        (0, routes_1.names)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), { names: ["file1", "file2"] });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQTZDO0FBRTdDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDakIsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUNULCtDQUErQztRQUMvQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFdBQVc7WUFDaEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtTQUNoRSxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxlQUFlLENBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZiwwQ0FBMEMsQ0FDM0MsQ0FBQztRQUVGLHFEQUFxRDtRQUNyRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFdBQVc7WUFDaEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtTQUN0RSxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsTUFBTSxFQUFFO1FBQ1QsaUVBQWlFO1FBQ2pFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsV0FBVztZQUNoQixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGFBQUksRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUVwRSxnRUFBZ0U7UUFDaEUsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRSxXQUFXO1lBQ2hCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUU7U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsYUFBSSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN0QyxPQUFPLEVBQUUsNEJBQTRCO1NBQ3RDLENBQUMsQ0FBQztRQUVILG9EQUFvRDtRQUNwRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFdBQVc7WUFDaEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtTQUN0RSxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDdEMsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsV0FBVztZQUNoQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO1NBQzVCLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQyxJQUFBLGFBQUksRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekMsSUFBSSxFQUFFLFVBQVU7WUFDaEIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1NBQzFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNWLHdEQUF3RDtRQUN4RCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxLQUFLO1lBQ2IsR0FBRyxFQUFFLFlBQVk7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsY0FBSyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZELCtEQUErRDtRQUMvRCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLFdBQVc7WUFDaEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtTQUNsRSxDQUFDLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDNUMsSUFBQSxhQUFJLEVBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDdkMsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsV0FBVztZQUNoQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1NBQ3BFLENBQUMsQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM1QyxJQUFBLGFBQUksRUFBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFekIsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRSxZQUFZO1NBQ2xCLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGNBQUssRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==