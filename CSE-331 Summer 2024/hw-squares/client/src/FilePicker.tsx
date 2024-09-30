import React, { Component, ChangeEvent, MouseEvent } from "react";

type FilePickerProps = {
  /** Called when a file is selected. */
  onFilePick: (name: string) => void;
  /** List of file names. */
  fileNames: string[];
  /** Called when the create button is clicked. */
  onCreateFile: (name: string) => void;
};

type FilePickerState = {
  /** Text in the name text box. */
  name: string;
};

/** Displays the list of created design files. */
export class FilePicker extends Component<FilePickerProps, FilePickerState> {
  constructor(props: FilePickerProps) {
    super(props);
    this.state = { name: "" };
  }

  // render the UI for the file picker, a list of files and a text box to create a new file
  render = (): JSX.Element => {
    return (
      <div>
        <h3>Files</h3>
        {this.renderItems()}
        <label>
          Create
          <input
            type="text"
            value={this.state.name}
            onChange={this.doNameChange}
            placeholder="Enter file name"
          />
        </label>
        <button onClick={this.doCreateClick}>Create</button>
      </div>
    );
  };

  // Returns list item for each file name, with each item containing a link to select the file.
  renderItems = (): JSX.Element[] => {
    const items: JSX.Element[] = [];
    // Inv: items contains a string list item for each fileName of this.props.fileNames[0 .. i-1]
    for (const fileName of this.props.fileNames) {
      const id = "file_" + fileName;
      items.push(
        <li key={id}>
          <a href="#" onClick={() => this.props.onFilePick(fileName)}>
            {fileName}
          </a>
        </li>
      );
    }
    return items;
  };

  // Updates our record with the file name text being typed in
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: evt.target.value });
  };

  // Updates the UI to show the file editor
  doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.name.trim()) {
      this.props.onCreateFile(this.state.name);
    } else {
      alert("Please enter a valid file name.");
    }
  };
}
