import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Event } from "./event";

type GetTicketsProps = {
  events: ReadonlyArray<Event>;
  onBackClick: () => void;
  onReserveClick: (
    event: Event,
    reserverName: string,
    numTickets: number
  ) => void;
};

type GetTicketsState = {
  selectedSport: string;
  selectedEvent: Event | null;
  reserverName: string;
  numTickets: string;
  error: string;
};

export class GetTickets extends Component<GetTicketsProps, GetTicketsState> {
  constructor(props: GetTicketsProps) {
    super(props);

    this.state = {
      selectedSport: "",
      selectedEvent: null,
      reserverName: "",
      numTickets: "1",
      error: "",
    };
  }

  // Render the main components of the page
  render = (): JSX.Element => {
    return (
      <div>
        <h2>Get Event Tickets</h2>
        <div>
          <label htmlFor="sport">Sport:</label>
          <select
            id="sport"
            value={this.state.selectedSport}
            onChange={this.doSportChange}
          >
            <option value="" disabled>
              Select a sport
            </option>
            {this.renderSportsOptions()}
          </select>
        </div>

        {this.state.selectedSport && this.renderEventSelection()}
        {this.state.selectedEvent && this.renderEventDetails()}
        <button type="button" onClick={this.doBackClick}>
          Back
        </button>
      </div>
    );
  };

  //Render event selection form
  renderEventSelection = (): JSX.Element => {
    return (
      <div>
        <label htmlFor="event">Event:</label>
        <select
          id="event"
          value={this.state.selectedEvent?.name || ""}
          onChange={this.doEventChange}
        >
          <option value="" disabled>
            Select an event
          </option>
          {this.renderEventOptions()}
        </select>
      </div>
    );
  };

  renderEventDetails = (): JSX.Element => {
    if (!this.state.selectedEvent) {
      return <div>no event selected yet... but I'm hidden anyway</div>;
    }

    return (
      <div>
        <p>Description: {this.state.selectedEvent.description}</p>
        <p>Date: August {this.state.selectedEvent.date}, 2024</p>
        <p>Venue: {this.state.selectedEvent.venue}</p>
        <p>
          Tickets Available:{" "}
          {this.state.selectedEvent.maxTickets -
            this.state.selectedEvent.reservedTickets}{" "}
          / {this.state.selectedEvent.maxTickets}
        </p>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={this.state.reserverName}
            onChange={this.doNameChange}
          />
        </div>
        <div>
          <label htmlFor="numTickets">Num. Tickets:</label>
          <input
            id="numTickets"
            type="number"
            value={this.state.numTickets}
            min="1"
            onChange={this.doNumTicketsChange}
          />
        </div>
        {this.renderError()}
        <button type="button" onClick={this.doReserveClick}>
          Get Tickets
        </button>
      </div>
    );
  };
  // Render the sports options
  renderSportsOptions = (): JSX.Element[] => {
    const sportsOptions: JSX.Element[] = [];
    const seenSports = new Set();
    // Loop through all events and push sports with available tickets to the sportsOptions array
    for (const [index, event] of this.props.events.entries()) {
      if (
        event.maxTickets > event.ticketsSold &&
        !seenSports.has(event.sport)
      ) {
        seenSports.add(event.sport);
        sportsOptions.push(<option key={index}>{event.sport}</option>);
      }
    }
    return sportsOptions;
  };

  // Render the event options after a sport is selected
  renderEventOptions = (): JSX.Element[] => {
    const eventOptions: JSX.Element[] = [];
    const seenEvents = new Set(); // since a set only includes unique values
    // Loop through all events and push those with available tickets to the eventOptions array
    for (const [index, event] of this.props.events.entries()) {
      if (
        event.sport === this.state.selectedSport &&
        event.maxTickets > event.ticketsSold &&
        !seenEvents.has(event.name)
      ) {
        seenEvents.add(event.name);
        eventOptions.push(<option key={index}>{event.name}</option>);
      }
    }
    return eventOptions;
  };

  renderError = (): JSX.Element => {
    if (!this.state.error) {
      return <div></div>;
    } else {
      return <p style={{ color: "red" }}>{this.state.error}</p>;
    }
  };

  // Called when the sport is changed
  doSportChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ selectedSport: evt.target.value, selectedEvent: null });
  };

  // Called when the event is changed
  doEventChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const selectedEvent =
      this.props.events.find((event) => event.name === evt.target.value) ||
      null;
    this.setState({ selectedEvent });
  };

  // Called when the name is changed
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ reserverName: evt.target.value });
  };

  // Called when the number of tickets is changed
  doNumTicketsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ numTickets: evt.target.value });
  };

  // Called when the reserve button is clicked
  doReserveClick = (_: MouseEvent<HTMLButtonElement>): void => {
    const selectedEvent = this.state.selectedEvent;
    const reserverName = this.state.reserverName;
    const numTickets = this.state.numTickets;

    if (selectedEvent && reserverName.trim() && parseInt(numTickets) > 0) {
      if (
        parseInt(numTickets) <=
        selectedEvent.maxTickets - selectedEvent.reservedTickets
      ) {
        const updatedEvent: Event = {
          name: selectedEvent.name,
          sport: selectedEvent.sport,
          description: selectedEvent.description,
          date: selectedEvent.date,
          venue: selectedEvent.venue,
          maxTickets: selectedEvent.maxTickets,
          reservedTickets: selectedEvent.reservedTickets + parseInt(numTickets),
          ticketsSold: selectedEvent.ticketsSold + parseInt(numTickets),
          reserverName: reserverName,
        };

        this.props.onReserveClick(
          updatedEvent,
          reserverName,
          parseInt(numTickets)
        );
        this.setState({ error: "" });
      } else {
        this.setState({ error: "Not enough tickets available." });
      }
    } else {
      this.setState({
        error:
          "Please provide all required information and ensure the number of tickets is valid.",
      });
    }
  };

  doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();
  };
}
