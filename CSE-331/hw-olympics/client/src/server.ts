import { Event } from "./event";
import { isRecord } from "./record";

/** Type of callback that receives the list of events */
export type ListCallback = (events: Event[]) => void;

/** Type of callback that receives the ranked list of events */
export type RankedListCallback = (events: Event[]) => void;

/** Type of callback that receives a single event's details */
export type EventDetailsCallback = (event: Event) => void;

/** Type of callback that receives the created event */
export type AddEventCallback = (event: Event) => void;

/** Type of callback that receives the updated event */
export type ReserveTicketsCallback = (event: Event) => void;

/**
 * Fetches the list of events from the server, sorted by date.
 * Passes the list of events to the given callback.
 * @param cb callback that accepts an array of Event objects
 */
export const listEvents = (cb: ListCallback): void => {
  fetch("/api/list")
    .then((res) => doListResp(res, cb))
    .catch(() => doListError("failed to connect to server"));
};

/**
 * Fetches the list of ranked events from the server, sorted by tickets sold.
 * Passes the ranked list of events to the given callback.
 * @param cb callback that accepts an array of Event objects
 */
export const listRankedEvents = (cb: RankedListCallback): void => {
  fetch("/api/ranked")
    .then((res) => doRankedListResp(res, cb))
    .catch(() => doRankedListError("failed to connect to server"));
};

/**
 * Fetches details of a specific event by its name.
 * Passes the event details to the given callback.
 * @param name The name of the event to retrieve details for
 * @param cb callback that accepts the Event object
 */
export const getEventDetails = (
  name: string,
  cb: EventDetailsCallback
): void => {
  fetch(`/api/details?name=${encodeURIComponent(name)}`)
    .then((res) => doEventDetailsResp(res, cb))
    .catch(() => doEventDetailsError("failed to connect to server"));
};

/**
 * Adds a new event to the server.
 * Passes the created event to the given callback.
 * @param event Event object to be added to the server
 * @param cb callback that accepts the created Event object
 */
export const addEvent = (event: Event, cb: AddEventCallback): void => {
  fetch("/api/add", {
    method: "POST",
    body: JSON.stringify(event),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => doAddResp(res, cb))
    .catch(() => doAddError("failed to connect to server"));
};

/**
 * Reserves tickets for an event on the server.
 * Passes the updated event to the given callback.
 * @param name The name of the event to reserve tickets for
 * @param reserverName The name of the person reserving the tickets
 * @param numTickets The number of tickets to reserve
 * @param cb callback that accepts the updated Event object
 */
export const reserveTickets = (
  name: string,
  reserverName: string,
  numTickets: number,
  cb: ReserveTicketsCallback
): void => {
  const body = { name, reserverName, numTickets };
  fetch("/api/reserve", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => doReserveResp(res, cb))
    .catch(() => doReserveError("failed to connect to server"));
};

///////////////////////////////////////////////////////////////////////////////
// Helper functions: no need to read or access these
///////////////////////////////////////////////////////////////////////////////

// Accessing /list route helpers

// Called when the server responds with to a request for the list of events.
const doListResp = (res: Response, cb: ListCallback): void => {
  if (res.status === 200) {
    res
      .json()
      .then((val) => doListJson(val, cb))
      .catch(() => doListError("200 response is not JSON"));
  } else if (res.status === 400) {
    res
      .text()
      .then(doListError)
      .catch(() => doListError("400 response is not text"));
  } else {
    doListError(`bad status code: ${res.status}`);
  }
};

// Called when the server responds with JSON data for the list of events.
const doListJson = (val: unknown, cb: ListCallback): void => {
  if (!isRecord(val) || !Array.isArray(val.events)) {
    console.error("Invalid JSON from /api/list", val);
    return;
  }

  const events: Event[] = [];
  for (const event of val.events) {
    if (isEvent(event)) {
      events.push(event);
    } else {
      console.error("Invalid event from /api/list", event);
      return;
    }
  }

  cb(events);
};

// Called when the server responds with a request to a ranked list of events.
const doRankedListResp = (res: Response, cb: RankedListCallback): void => {
  if (res.status === 200) {
    res
      .json()
      .then((val) => doRankedListJson(val, cb))
      .catch(() => doRankedListError("200 response is not JSON"));
  } else if (res.status === 400) {
    res
      .text()
      .then(doRankedListError)
      .catch(() => doRankedListError("400 response is not text"));
  } else {
    doRankedListError(`bad status code: ${res.status}`);
  }
};

// Called when the server responds with JSON data for the ranked list of events.
const doRankedListJson = (val: unknown, cb: RankedListCallback): void => {
  if (!isRecord(val) || !Array.isArray(val.events)) {
    console.error("Invalid JSON from /api/ranked", val);
    return;
  }

  const events: Event[] = [];
  for (const event of val.events) {
    if (isEvent(event)) {
      events.push(event);
    } else {
      console.error("Invalid event from /api/ranked", event);
      return;
    }
  }

  cb(events);
};

// Error handling for all routes

const doListError = (msg: string): void => {
  console.error(`Error fetching /api/list: ${msg}`);
};

const doRankedListError = (msg: string): void => {
  console.error(`Error fetching /api/ranked: ${msg}`);
};

// Called when the server responds to a request to add an event.
const doAddResp = (res: Response, cb: AddEventCallback): void => {
  if (res.status === 200) {
    res
      .json()
      .then((val) => doAddJson(val, cb))
      .catch(() => doAddError("200 response is not JSON"));
  } else if (res.status === 400) {
    res
      .text()
      .then(doAddError)
      .catch(() => doAddError("400 response is not text"));
  } else {
    doAddError(`bad status code: ${res.status}`);
  }
};

// Called when the server responds with JSON data for the added event.
const doAddJson = (val: unknown, cb: AddEventCallback): void => {
  if (isEvent(val)) {
    cb(val);
  } else {
    console.error("Invalid JSON from /api/add", val);
  }
};

// Error handling for /add route
const doAddError = (msg: string): void => {
  console.error(`Error fetching /api/add: ${msg}`);
};

// Called when the server responds to a request to reserve tickets.
const doReserveResp = (res: Response, cb: ReserveTicketsCallback): void => {
  if (res.status === 200) {
    res
      .json()
      .then((val) => doReserveJson(val, cb))
      .catch(() => doReserveError("200 response is not JSON"));
  } else if (res.status === 400) {
    res
      .text()
      .then(doReserveError)
      .catch(() => doReserveError("400 response is not text"));
  } else {
    doReserveError(`bad status code: ${res.status}`);
  }
};

// Called when the server responds with JSON data for the reserved tickets.
const doReserveJson = (val: unknown, cb: ReserveTicketsCallback): void => {
  if (isRecord(val) && isEvent(val.event)) {
    cb(val.event);
  } else {
    console.error("Invalid JSON from /api/reserve", val);
  }
};

// Error handling for /reserve route
const doReserveError = (msg: string): void => {
  console.error(`Error fetching /api/reserve: ${msg}`);
};

// Called when the server responds to a request for event details.
const doEventDetailsResp = (res: Response, cb: EventDetailsCallback): void => {
  if (res.status === 200) {
    res
      .json()
      .then((val) => doEventDetailsJson(val, cb))
      .catch(() => doEventDetailsError("200 response is not JSON"));
  } else if (res.status === 400) {
    res
      .text()
      .then(doEventDetailsError)
      .catch(() => doEventDetailsError("400 response is not text"));
  } else {
    doEventDetailsError(`bad status code: ${res.status}`);
  }
};

// Called when the server responds with JSON data for the event details.
const doEventDetailsJson = (val: unknown, cb: EventDetailsCallback): void => {
  if (isRecord(val) && isEvent(val.event)) {
    cb(val.event);
  } else {
    console.error("Invalid JSON from /api/details", val);
  }
};

// Error handling for /details route
const doEventDetailsError = (msg: string): void => {
  console.error(`Error fetching /api/details: ${msg}`);
};

const isEvent = (val: unknown): val is Event => {
  return (
    isRecord(val) &&
    typeof val.name === "string" &&
    typeof val.sport === "string" &&
    typeof val.description === "string" &&
    typeof val.date === "number" &&
    typeof val.venue === "string" &&
    typeof val.maxTickets === "number" &&
    typeof val.reservedTickets === "number" &&
    typeof val.ticketsSold === "number" &&
    (typeof val.reserverName === "undefined" ||
      typeof val.reserverName === "string")
  );
};
