import React, { Component } from "react";
import { EventList } from "./EventList";
import { NewEvent, NewEventInfo } from "./NewEvent";
import { GetTickets } from "./GetTickets";
import { EventDetails } from "./EventDetails";
import { Event } from "./event";
import { listEvents, addEvent, reserveTickets } from "./server";

/** Describes set of possible app page views. */
type Page =
  | { kind: "list" }
  | { kind: "new" }
  | { kind: "details"; event: Event }
  | { kind: "getTickets" };

/** Stores state for the current page of the app to show. */
type OlympicAppState = {
  show: Page;
  events: Event[];
};

/** Displays the UI of the Olympic RSVP application. */
export class OlympicApp extends Component<{}, OlympicAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      show: { kind: "list" },
      events: [],
    };
  }

  componentDidMount = (): void => {
    this.doRefreshClick();
  };

  // Top-level component that displays the appropriate page.
  render = (): JSX.Element => {
    if (this.state.show.kind === "list") {
      return (
        <EventList
          events={this.state.events}
          onNewClick={this.doNewClick}
          onGetTicketsClick={this.doGetTicketsClick}
          onEventClick={this.doEventClick}
        />
      );
    } else if (this.state.show.kind === "new") {
      return (
        <NewEvent
          onCreateEvent={this.doCreateEventClick}
          onBackClick={this.doBackClick}
        />
      );
    } else if (this.state.show.kind === "details") {
      return (
        <EventDetails
          event={this.state.show.event}
          onBackClick={this.doBackClick}
          onGetTicketsClick={this.doGetTicketsClick}
        />
      );
    } else if (this.state.show.kind === "getTickets") {
      return (
        <GetTickets
          events={this.state.events}
          onBackClick={this.doBackClick}
          onReserveClick={this.doReserveClick}
        />
      );
    } else {
      return <div>Invalid state</div>;
    }
  };

  // Handles the onRefreshClick callback. Fetches the list of events from the
  // server and updates the state.
  doRefreshClick = (): void => {
    listEvents(this.doListResp);
  };

  // Handles the onListResp callback. Updates the state with the given list of
  // events.
  doListResp = (events: Event[]): void => {
    this.setState({ events });
  };

  // Called when the add event button is clicked. Navigates to the new Events page.
  doNewClick = (): void => {
    this.setState({ show: { kind: "new" } });
  };

  // Called when the get tickets button is clicked. Navigates to the getTickets page.
  doGetTicketsClick = (): void => {
    this.setState({ show: { kind: "getTickets" } });
  };

  // Handles the onCreateClick callback. Navigates to the main/list page and
  // adds the new event with the given info to the list of events.
  doCreateEventClick = (info: NewEventInfo): void => {
    const newEvent: Event = {
      name: info.name,
      sport: info.sport,
      description: info.description,
      date: info.date,
      venue: info.venue,
      maxTickets: info.maxTickets,
      reservedTickets: 0,
      ticketsSold: 0,
    };
    addEvent(newEvent, this.doAddEventResp);
    const event = this.state.events.concat([newEvent]);
    this.setState({ show: { kind: "list" }, events: event });
  };

  // Handles the add event callback. Updates the state with the new events list.
  doAddEventResp = (event: Event): void => {
    if (event === undefined) {
      console.error("Invalid event");
      return;
    } else {
      const newEvents = this.state.events.concat([event]);
      this.setState({ events: newEvents });
    }
  };

  // Handles the onEventClick callback. Navigates to the event details page.
  doEventClick = (index: number): void => {
    const event = this.state.events[index];
    this.setState({ show: { kind: "details", event } });
  };

  // Handles the onReserveClick callback. Reserves the given number of tickets
  // for the given reserver name for the given event.
  doReserveClick = (
    event: Event,
    reserverName: string,
    numTickets: number
  ): void => {
    reserveTickets(event.name, reserverName, numTickets, this.doReserveResp);
  };

  // Handles the reserve tickets response. Updates the state with the updated
  // list of events (usually with the tickets Sold count updated).
  doReserveResp = (event: Event): void => {
    if (event === undefined) {
      console.error("Invalid event");
      return;
    } else {
      const updatedEvents: Event[] = [];
      for (const e of this.state.events) {
        if (e.name === event.name) {
          updatedEvents.push(event);
        } else {
          updatedEvents.push(e);
        }
      }
      this.setState({ events: updatedEvents, show: { kind: "list" } });
    }
  };

  // Handles the onBackClick callback. Navigates to the main/list page.
  doBackClick = (): void => {
    this.setState({ show: { kind: "list" } });
  };
}
