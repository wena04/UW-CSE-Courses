import React, { Component, MouseEvent } from "react";
import { Event } from "./event";
import { listEvents, listRankedEvents } from "./server";
import { explode_array, at, len } from "./list";
import "./styles.css";

type ListProps = {
  events: ReadonlyArray<Event>;
  onNewClick: () => void;
  onGetTicketsClick: () => void;
  onEventClick: (index: number) => void;
};

type ListState = {
  events: Event[] | undefined;
  rankings: Event[];
};

export class EventList extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      events: undefined,
      rankings: [],
    };
  }

  componentDidMount = (): void => {
    this.doRefreshClick(); // Fetch events and rankings when the component mounts
  };

  // Fetch events list and rankings list from the server
  doRefreshClick = (): void => {
    listEvents(this.doListResp);
    listRankedEvents(this.doRankingResp);
  };

  // Update the state with the events list from the server
  doListResp = (events: Event[]): void => {
    this.setState({ events: events });
  };

  // Update the state with the rankings list from the server
  // this way can display the top 3 most sold events in the rankings
  doRankingResp = (rankings: Event[]): void => {
    const topRankings = rankings.slice(0, 3); // Get the top 3 events
    this.setState({ rankings: topRankings });
  };

  // Render the main components of the page
  render = (): JSX.Element => {
    return (
      <div className="current-events">
        <h2>Current Events</h2>
        {this.renderEvents()}
        <button type="button" onClick={this.doRefreshClick}>
          Refresh
        </button>
        <button type="button" onClick={this.props.onNewClick}>
          New Event
        </button>
        <button type="button" onClick={this.props.onGetTicketsClick}>
          Get Tickets
        </button>
        <h2>Rankings</h2>
        {this.renderRankings()}
      </div>
    );
  };

  // Render the list of events
  renderEvents = (): JSX.Element => {
    // Check if the events list is undefined (it does get into this at first, I checked it)
    if (this.state.events === undefined) {
      return (
        <div>
          <p>Loading Events</p>Loading Event List
        </div>
      );
    } else {
      const eventsList: JSX.Element[] = [];
      for (const event of this.state.events) {
        const i = this.state.events.indexOf(event);
        const ticketsAvailable = event.maxTickets - event.reservedTickets;
        const ticketStatus =
          ticketsAvailable > 0
            ? `${ticketsAvailable} tickets available`
            : "SOLD OUT";

        eventsList.push(
          <li key={`${event.name}-${event.date}-${i}`} className="event-box">
            <a href="#" onClick={(evt) => this.doEventClick(evt, i)}>
              Event: {event.name} | Sport: ({event.sport}) | {ticketStatus} |
              August {event.date}, 2024
            </a>
          </li>
        );
      }
      return <ul>{eventsList}</ul>;
    }
  };

  // Render the top 3 most sold events in the rankings
  renderRankings = (): JSX.Element => {
    return (
      <div className="rankings">
        <ul>
          {this.renderHelper("Gold", 0n)}
          {this.renderHelper("Silver", 1n)}
          {this.renderHelper("Bronze", 2n)}
        </ul>
      </div>
    );
  };

  // Helper function to render the top 3 most sold events in the rankings
  renderHelper = (rank: string, index: bigint): JSX.Element => {
    // Check if the index is within the rankings array
    const className =
      rank === "Gold"
        ? "gold"
        : rank === "Silver"
        ? "silver"
        : rank === "Bronze"
        ? "bronze"
        : "white";
    if (len(explode_array(this.state.rankings)) > index) {
      // Get the event at the index (the at function is defined in list.ts like in previous hw)
      const event = at(index, explode_array(this.state.rankings));
      return (
        <li key={rank} className={className}>
          {rank}: {event.name} - {event.reservedTickets} sold
        </li>
      );
    } else {
      return (
        <li key={rank} className={className}>
          {rank}: No event
        </li>
      ); // If the index is out of bounds, display "No event"
    }
  };

  // Handle event click
  doEventClick = (evt: MouseEvent<HTMLAnchorElement>, index: number): void => {
    evt.preventDefault();
    this.props.onEventClick(index);
  };
}
