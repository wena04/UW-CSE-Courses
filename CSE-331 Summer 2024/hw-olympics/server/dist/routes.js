"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventDetails = exports.reserveTickets = exports.addEvent = exports.listRankedEvents = exports.listEvents = exports.resetForTesting = void 0;
// Map from event name to Event.
const events = new Map();
/** Testing function to remove all the added auctions. */
const resetForTesting = () => {
    events.clear();
};
exports.resetForTesting = resetForTesting;
// Sort events by their date in ascending order, i.e., earliest first.
const compareTime = (a, b) => {
    return a.date - b.date;
};
/**
 * Returns a list of all the events, sorted so that the events happening
 * soonest are listed first.
 * @param _req the request
 * @param res the response
 */
const listEvents = (_req, res) => {
    const vals = Array.from(events.values());
    vals.sort(compareTime);
    res.send({ events: vals });
};
exports.listEvents = listEvents;
// Sort events by the number of reserved tickets in descending order
const compareTicketsSold = (a, b) => {
    return b.ticketsSold - a.ticketsSold;
};
/** Returns a list of all the events, sorted by the number of tickets sold
 * @param _req the request
 * @param res the response
 */
const listRankedEvents = (_req, res) => {
    const vals = Array.from(events.values());
    vals.sort(compareTicketsSold);
    res.send({ events: vals });
};
exports.listRankedEvents = listRankedEvents;
/**
 * Adds a new event to the list of events.
 * @param req the request
 * @param res the response
 */
const addEvent = (req, res) => {
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
    }
    else if (isNaN(date) || date < 1 || date > 31) {
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
    }
    else if (isNaN(maxTickets) || maxTickets < 1) {
        res
            .status(400)
            .send(`'maxTickets' is not a positive integer: ${maxTickets}`);
        return;
    }
    const newEvent = {
        name: name,
        sport: sport,
        description: description,
        date: date,
        venue: venue,
        maxTickets: maxTickets,
        reservedTickets: 0,
        ticketsSold: 0,
        reserverName: undefined, // Not required during creation
    };
    events.set(name, newEvent); // add this to the map of auctions
    res.send(newEvent); // send the event we made
};
exports.addEvent = addEvent;
/** Reserve tickets for an event */
const reserveTickets = (req, res) => {
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
    }
    else if (isNaN(numTickets) || numTickets < 1) {
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
exports.reserveTickets = reserveTickets;
/**
 * Retrieves the current state of a given event.
 * @param req the request
 * @param req the response
 */
const getEventDetails = (req, res) => {
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
exports.getEventDetails = getEventDetails;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param) && param.length > 0) {
        return first(param[0]);
    }
    else if (typeof param === "string") {
        return param;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFvQkEsZ0NBQWdDO0FBQ2hDLE1BQU0sTUFBTSxHQUF1QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRTdDLHlEQUF5RDtBQUNsRCxNQUFNLGVBQWUsR0FBRyxHQUFTLEVBQUU7SUFDeEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUZXLFFBQUEsZUFBZSxtQkFFMUI7QUFFRixzRUFBc0U7QUFDdEUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFRLEVBQUUsQ0FBUSxFQUFVLEVBQUU7SUFDakQsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQWlCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ3ZFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDO0FBSlcsUUFBQSxVQUFVLGNBSXJCO0FBRUYsb0VBQW9FO0FBQ3BFLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFRLEVBQUUsQ0FBUSxFQUFVLEVBQUU7SUFDeEQsT0FBTyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFDdkMsQ0FBQyxDQUFDO0FBRUY7OztHQUdHO0FBQ0ksTUFBTSxnQkFBZ0IsR0FBRyxDQUM5QixJQUFpQixFQUNqQixHQUFpQixFQUNYLEVBQUU7SUFDUixNQUFNLElBQUksR0FBRyxL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