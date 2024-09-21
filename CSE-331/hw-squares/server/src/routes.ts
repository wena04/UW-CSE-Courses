import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response; // only writing, so no need to check

// In-memory storage for designs using Map
const fileStorage: Map<string, unknown> = new Map();

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string | undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === "string") {
    return param;
  } else {
    return undefined;
  }
};

/**
 * Save a design
 * @param req request to respond to
 * @param res object to send response with
 */
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.body.name);
  const content = req.body.content;
  if (name === undefined || content === undefined) {
    res.status(400).send('missing "name" or "content" in parameter');
    return;
  }
  fileStorage.set(name, content);
  res.status(200).send({ saved: true });
};

/**
 * Load the last-saved content of a file with a given name
 * @param req request to respond to
 * @param res object to send response with
 */
export const load = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }
  if (!fileStorage.has(name)) {
    res.status(404).send({ message: `File ${name} not found` });
    return;
  }
  const content = fileStorage.get(name);
  res.status(200).send({ name: name, content: content });
};

/**
 * List the names of all files currently saved
 * @param req request to respond to
 * @param res object to send response with
 */
export const names = (_req: SafeRequest, res: SafeResponse): void => {
  const names = Array.from(fileStorage.keys());
  res.status(200).send({ names: names });
};
