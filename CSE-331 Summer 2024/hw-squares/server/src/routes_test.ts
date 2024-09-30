import * as assert from "assert";
import * as httpMocks from "node-mocks-http";
import { save, load, names } from "./routes";

describe("routes", function () {
  it("save", function () {
    // First branch, straight line code, error case: no name or content provided, status code 400
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: 1086, content: { kind: "solid", color: "blue" } },
    });
    const res1 = httpMocks.createResponse();
    save(req1, res1);
    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(
      res1._getData(),
      'missing "name" or "content" in parameter'
    );

    // Second branch, straight line code, successful save status code 200
    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "testFile", content: { kind: "solid", color: "blue" } },
    });
    const res2 = httpMocks.createResponse();
    save(req2, res2);
    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), { saved: true });
  });

  it("load", function () {
    // First branch, error case: no name provided, status code 400
    const req1 = httpMocks.createRequest({
      method: "GET",
      url: "/api/load",
      query: {},
    });
    const res1 = httpMocks.createResponse();
    load(req1, res1);
    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'missing "name" parameter');

    // Second branch, error case: file not found, status code 404
    const req2 = httpMocks.createRequest({
      method: "GET",
      url: "/api/load",
      query: { name: "nonexistent" },
    });
    const res2 = httpMocks.createResponse();
    load(req2, res2);
    assert.deepStrictEqual(res2._getStatusCode(), 404);
    assert.deepStrictEqual(res2._getData(), {
      message: "File nonexistent not found",
    });

    // Third branch, successful load of a file, status code 200
    const req3 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "testFile", content: { kind: "solid", color: "blue" } },
    });
    const res3 = httpMocks.createResponse();
    save(req3, res3);

    const loadReq = httpMocks.createRequest({
      method: "GET",
      url: "/api/load",
      query: { name: "testFile" },
    });
    const loadRes = httpMocks.createResponse();
    load(loadReq, loadRes);
    assert.deepStrictEqual(loadRes._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes._getData(), {
      name: "testFile",
      content: { kind: "solid", color: "blue" },
    });
  });

  it("names", function () {
    // First branch, successful at listing names of current files by returning 200 status code
    const req1 = httpMocks.createRequest({
      method: "POST",
      url: "/api/save",
      body: { name: "testFile", content: { kind: "solid", color: "blue" } },
    });
    const res1 = httpMocks.createResponse();
    save(req1, res1);

    const req2 = httpMocks.createRequest({ method: "GET", url: "/api/names" });
    const res2 = httpMocks.createResponse();
    names(req2, res2);
    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), { names: ["testFile"] });
  });
});
