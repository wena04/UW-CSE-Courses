import { isRecord } from "./record";

// Description of an individual event
export type Event = {
  name: string;
  sport: string;
  description: string;
  date: number;
  venue: string;
  maxTickets: number;
  reservedTickets: number;
  ticketsSold: number;
  reserverName?: string; // Optional field
};

/**
 * Parses unknown data into an array of Events. Will log an error and return
 * undefined if it is not an array of Events.
 * @param val unknown data to parse into an array of Events
 * @return Event[] if val is an array of Events and undefined otherwise
 */
export const parseEvents = (val: unknown): undefined | Event[] => {
  if (!Array.isArray(val)) {
    console.error("not an array", val);
    return undefined;
  }

  const events: Event[] = [];
  for (const item of val) {
    if (!isRecord(item)) {
      console.error("item is not a record", val);
      return undefined;
    } else if (typeof item.name !== "string") {
      console.error("item.name is missing or invalid", item.name);
      return undefined;
    } else if (typeof item.sport !== "string") {
      console.error("item.sport is missing or invalid", item.sport);
      return undefined;
    } else if (typeof item.description !== "string") {
      console.error("item.description is missing or invalid", item.description);
      return undefined;
    } else if (typeof item.date !== "number" || isNaN(item.date)) {
      console.error("item.date is missing or invalid", item.date);
      return undefined;
    } else if (typeof item.venue !== "string") {
      console.error("item.venue is missing or invalid", item.venue);
      return undefined;
    } else if (
      typeof item.maxTickets !== "number" ||
      isNaN(item.maxTickets) ||
      item.maxTickets < 1
    ) {
      console.error("item.maxTickets is missing or invalid", item.maxTickets);
      return undefined;
    } else if (
      typeof item.reservedTickets !== "number" ||
      isNaN(item.reservedTickets)
    ) {
      console.error(
        "item.reservedTickets is missing or invalid",
        item.reservedTickets
      );
      return undefined;
    } else if (
      typeof item.ticketsSold !== "number" ||
      isNaN(item.ticketsSold)
    ) {
      console.error("item.ticketsSold is missing or invalid", item.ticketsSold);
      return undefined;
    } else if (
      typeof item.reserverName !== "undefined" &&
      typeof item.reserverName !== "string"
    ) {
      console.error("item.reserverName is invalid", item.reserverName);
      return undefined;
    }

    const event: Event =
      typeof item.reserverName === "string"
        ? {
            name: item.name,
            sport: item.sport,
            description: item.description,
            date: item.date,
            venue: item.venue,
            maxTickets: item.maxTickets,
            reservedTickets: item.reservedTickets,
            ticketsSold: item.ticketsSold,
            reserverName: item.reserverName,
          }
        : {
            name: item.name,
            sport: item.sport,
            description: item.description,
            date: item.date,
            venue: item.venue,
            maxTickets: item.maxTickets,
            reservedTickets: item.reservedTickets,
            ticketsSold: item.ticketsSold,
          };
    events.push(event);
  }
  return events;
};
