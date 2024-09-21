import React, { Component, ChangeEvent, MouseEvent } from "react";
import "./NewEvent.css";

export type NewEventInfo = {
  /** Event name */
  name: string;

  /** Sport associated with the event */
  sport: string;

  /** Description of the event */
  description: string;

  /** Date of the event */
  date: number; // Example: 23 would represent August 23, 2024

  /** Venue where the event is held */
  venue: string;

  /** Maximum number of tickets available */
  maxTickets: number;
};

type NewEventProps = {
  /** Tell the parent that an event with the given info was created. */
  onCreateEvent: (info: NewEventInfo) => void;

  /** Tell the parent that back was clicked. */
  onBackClick: () => void;
};

type NewEventState = {
  /** Mirrors text in the event name textbox*/
  name: string;
  /** Mirrors text in the sports of event textbox */
  sport: string;
  /** Mirrors text in the description textbox */
  description: string;
  /** Mirrors text in the date textbox */
  date: string;
  /** Mirrors text in the venue textbox */
  venue: string;
  /** Mirrors text in the max tickets textbox */
  maxTickets: string;
  /** Contents describe reason for entering error state if non-empty.*/
  error: string;
};

/** Displays the UI for allowing the user to create a new event. */
export class NewEvent extends Component<NewEventProps, NewEventState> {
  constructor(props: NewEventProps) {
    super(props);
    this.state = {
      name: "",
      sport: "",
      description: "",
      date: "",
      venue: "",
      maxTickets: "",
      error: "",
    };
  }

  // Renders the UI for creating a new event.
  render = (): JSX.Element => {
    return (
      <div className="new-event-form">
        <h2>Add Event</h2>
        <div>
          <label htmlFor="name">Event: </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.doNameChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="sport">Sport: </label>
          <input
            id="sport"
            type="text"
            value={this.state.sport}
            onChange={this.doSportChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            id="description"
            type="text"
            value={this.state.description}
            onChange={this.doDescriptionChange}
          ></input>
        </div>
        <div className="date-input-container">
          <label htmlFor="date">Date: </label>
          <span> August </span>
          <input
            id="date"
            type="number"
            min="1"
            max="31"
            value={this.state.date}
            onChange={this.doDateChange}
            required
          ></input>
          <span>,2024 </span>
        </div>
        <div>
          <label htmlFor="venue">Venue: </label>
          <input
            id="venue"
            type="text"
            value={this.state.venue}
            onChange={this.doVenueChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="maxTickets">Max Tickets Available: </label>
          <input
            id="maxTickets"
            type="number"
            min="1"
            value={this.state.maxTickets}
            onChange={this.doMaxTicketsChange}
            required
          ></input>
        </div>
        <button type="button" onClick={this.doCreateClick}>
          Create
        </button>
        <button type="button" onClick={this.doBackClick}>
          Back
        </button>
        {this.renderError()}
      </div>
    );
  };

  // Returns an empty div if not in error state. Otherwise, returns a div
  // that contains a user-friendly error message.
  renderError = (): JSX.Element => {
    if (this.state.error.length === 0) {
      return <div></div>;
    } else {
      // Note: See NewEvent.css for the styling of the error message.
      return (
        <div className="error-box">
          <p className="error-message">
            <b>Error</b>: {this.state.error}
          </p>
        </div>
      );
    }
  };

  // Called each time the user updates the text in the event name text box.
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: evt.target.value, error: "" });
  };

  // Called each time the user updates the text in the sports of event text box.
  doSportChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ sport: evt.target.value, error: "" });
  };

  // Called each time the user updates the text in the description text box.
  doDescriptionChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ description: evt.target.value, error: "" });
  };

  // Called each time the user updates the text in the date text box.
  doDateChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ date: evt.target.value, error: "" });
  };

  // Called each time the user updates the text in the venue text box.
  doVenueChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ venue: evt.target.value, error: "" });
  };

  // Called each time the user updates the text in the max tickets text box.
  doMaxTicketsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ maxTickets: evt.target.value, error: "" });
  };

  // Called when the user clicks the create button. The event is created if
  // all required fields are filled out correctly. Otherwise, the error state
  // will be triggered.
  doCreateClick = (_: MouseEvent<HTMLButtonElement>): void => {
    // Validate that the user entered all required information.
    if (
      this.state.name.trim().length === 0 ||
      this.state.sport.trim().length === 0 ||
      this.state.date.trim().length === 0 ||
      this.state.venue.trim().length === 0 ||
      this.state.maxTickets.trim().length === 0
    ) {
      this.setState({ error: "A required field is missing." });
      return;
    }

    // Validate date to be a number that is between 1 and 31 inclusive.
    const date = parseFloat(this.state.date);
    if (isNaN(date) || date < 1 || date > 31) {
      this.setState({ error: "Date must be between 1 and 31." });
      return;
    }

    // Validate max tickets
    const maxTickets = parseFloat(this.state.maxTickets);
    if (isNaN(maxTickets) || maxTickets < 1) {
      this.setState({ error: "Max Tickets must be a positive number." });
      return;
    }

    // Prepare the event data
    const event = {
      name: this.state.name,
      sport: this.state.sport,
      description: this.state.description,
      date,
      venue: this.state.venue,
      maxTickets,
    };

    // Inform the parent that the event was created
    this.props.onCreateEvent(event);
  };

  doAddError = (msg: string): void => {
    this.setState({ error: msg });
  };

  // Called when the user clicks on the back button.
  doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();
  };
}
