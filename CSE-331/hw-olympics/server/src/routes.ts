import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response; // only writing, so no need to check

// Description of an individual event (matches the event in client side)
type Event = {
  name: string;
  sport: string;
  description: string;
  date: number;
  venue: string;
  maxTickets: number;
  reservedTickets: number;
  ticketsSold: number;
  reserverName?: string; // Optional field for reserver name
};

// Map from event name to Event.
const events: Map<string, Event> = new Map();

/** Testing function to remove all the added auctions. */
export const resetForTesting = (): void => {
  events.clear();
};

// Sort events by their date in ascending order, i.e., earliest first.
const compareTime = (a: Event, b: Event): number => {
  return a.date - b.date;
};

/**
 * Returns a list of all the events, sorted so that the events happening
 * soonest are listed first.
 * @param _req the request
 * @param res the response
 */
export const listEvents = (_req: SafeRequest, res: SafeResponse): void => {
  const vals = Array.from(events.values());
  vals.sort(compareTime);
  res.send({ events: vals });
};

// Sort events by the number of reserved tickets in descending order
const compareTicketsSold = (a: Event, b: Event): number => {
  return b.ticketsSold - a.ticketsSold;
};

/** Returns a list of all the events, sorted by the number of tickets sold
 * @param _req the request
 * @param res the response
 */
export const listRankedEvents = (
  _req: SafeRequest,
  res: SafeResponse
): void => {
  const vals = Array.from(events.values());
  vals.sort(compareTicketsSold);
  res.send({ events: vals });
};

/**
 * Adds a new event to the list of events.
 * @param req the request
 * @param res the response
 */
export const addEvent = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if (typeof name !== "string") {
    res.status(400).send("Missing 'name' parameter");
    return;
  }

  const sport = req.body.sport;
  if (typeof sport !== "string") {
    res.status(400).send("Missing 'sport' parameter");
    return;
  }

  const description = req.body.description;
  if (typeof description !== "string") {
    res.status(400).send("Missing 'description' parameter");
    return;
  }

  const date = req.body.date;
  if (typeof date !== "number") {
    res.status(400).send(`'date' is not a number: ${date}`);
    return;
  } else if (isNaN(date) || date < 1 || date > 31) {
    res.status(400).send("Invalid date, date should be between 1 and 31");
    return;
  }

  const venue = req.body.venue;
  if (typeof venue !== "string") {
    res.status(400).send("Missing 'venue' parameter");
    return;
  }

  const maxTickets = req.body.maxTickets;
  if (typeof maxTickets !== "number") {
    res.status(400).send(`'maxTickets' is not a number: ${maxTickets}`);
    return;
  } else if (isNaN(maxTickets) || maxTickets < 1) {
    res
      .status(400)
      .send(`'maxTickets' is not a positive integer: ${maxTickets}`);
    return;
  }

  const newEvent: Event = {
    name: name,
    sport: sport,
    description: description,
    date: date,
    venue: venue,
    maxTickets: maxTickets,
    reservedTickets: 0, // Automatically initialize to 0
    ticketsSold: 0, // Automatically initialize to 0
    reserverName: undefined, // Not required during creation
  };
  events.set(name, newEvent); // add this to the map of auctions
  res.send(newEvent); // send the event we made
};

/** Reserve tickets for an event */
export const reserveTickets = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if (typeof name !== "string") {
    res.status(400).send("Missing 'name' parameter");
    return;
  }

  const reserverName = req.body.reserverName;
  if (typeof reserverName !== "string") {
    res.status(400).send("Missing 'reserverName' parameter");
    return;
  }

  const numTickets = req.body.numTickets;
  if (typeof numTickets !== "number") {
    res.status(400).send(`'numTickets' is not a number: ${numTickets}`);
    return;
  } else if (isNaN(numTickets) || numTickets < 1) {
    res
      .status(400)
      .send(`'numTickets' is not a positive integer: ${numTickets}`);
    return;
  }

  const event = events.get(name);

  if (event === undefined) {
    res.status(400).send(`No event with name '${name}'`);
    return;
  }

  const remainingTickets = event.maxTickets - event.reservedTickets;
  if (numTickets > remainingTickets) {
    res.status(400).send("Invalid number of tickets");
    return;
  }

  event.reservedTickets += numTickets;
  event.ticketsSold += numTickets;
  event.reserverName = reserverName;
  events.set(name, event); // Update the event
  res.send({ event });
};

/**
 * Retrieves the current state of a given event.
 * @param req the request
 * @param req the response
 */
export const getEventDetails = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send("Missing 'name' parameter");
    return;
  }

  const event = events.get(name);
  if (event === undefined) {
    res.status(404).send(`No event with name '${name}'`);
    return;
  }

  res.send({ event: event });
};

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string | undefined => {
  if (Array.isArray(param) && param.length > 0) {
    return first(param[0]);
  } else if (typeof param === "string") {
    return param;
  } else {
    return undefined;
  }
};
