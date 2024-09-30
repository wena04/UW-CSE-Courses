import React, { Component, ChangeEvent } from "react";
import { Event } from "./event";

type EventDetailsProps = {
  event: Event;
  onBackClick: () => void;
  onGetTicketsClick: () => void;
};

type EventDetailsState = {
  ticketsToReserve: string;
  reserverName: string;
  error: string;
};

export class EventDetails extends Component<
  EventDetailsProps,
  EventDetailsState
> {
  constructor(props: EventDetailsProps) {
    super(props);
    this.state = { ticketsToReserve: "1", reserverName: "", error: "" };
  }

  // render main components of this page
  render = (): JSX.Element => {
    const event = this.props.event;
    return (
      <div className="eventDisplay">
        <h2>{event.name}</h2>
        <p>
          <strong>Sport:</strong> {event.sport}
        </p>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Date:</strong> August {event.date}, 2024
        </p>
        <p>
          <strong>Venue:</strong> {event.venue}
        </p>
        <p>
          <strong>Tickets Sold:</strong> {event.ticketsSold}/{event.maxTickets}
        </p>
        <button onClick={this.props.onGetTicketsClick}>Get Tickets</button>
        <button onClick={this.props.onBackClick}>Back</button>
        {this.renderError()}
      </div>
    );
  };

  renderError = (): JSX.Element => {
    if (this.state.error.length === 0) {
      return <div></div>;
    } else {
      return (
        <div style={{ color: "red" }}>
          <strong>Error:</strong> {this.state.error}
        </div>
      );
    }
  };

  doReserverNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ reserverName: evt.target.value, error: "" });
  };

  doTicketsToReserveChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ ticketsToReserve: evt.target.value, error: "" });
  };
}
