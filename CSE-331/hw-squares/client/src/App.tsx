import React, { Component } from "react";
import { solid, split, Square } from "./square";
import { FileEditor } from "./FileEditor";
import { FilePicker } from "./FilePicker";
import { loadFile, saveFile, listFiles } from "./server";

/** Describes set of possible app page views. */
type Page =
  | { kind: "picking" }
  | { kind: "editing"; name: string; square: Square };

/** Stores state for the current page of the app to show. */
type AppState = {
  show: Page;
  loading: boolean;
  fileNames: string[];
};

/**
 * Displays the square application containing either a list of files names
 * to pick from or an editor for files files
 */
export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      show: { kind: "picking" },
      loading: false,
      fileNames: [],
    };
  }

  // Called immediately after a component is mounted. Setting state here will
  // trigger re-rendering to update our list of items.
  componentDidMount = (): void => {
    this.doRefreshTimeout();
  };

  // Return a UI with all the files and elements that allow them to add a new
  // file with a name of their choice.
  render = (): JSX.Element => {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.show.kind === "picking") {
      return (
        <FilePicker
          onFilePick={this.doFilePickClick}
          onCreateFile={this.doFileCreateClick}
          fileNames={this.state.fileNames}
        />
      );
    } else if (this.state.show.kind === "editing") {
      return (
        <FileEditor
          initialState={this.state.show.square}
          onSave={this.doSaveClick}
          fileName={this.state.show.name}
          onBack={this.doBackClick}
        />
      );
    }
    return <div>Unknown page state</div>;
  };

  // Called to refresh our list of files from the server.
  doRefreshTimeout = (): void => {
    this.doListFilesClick();
  };

  // Called when the user clicks to create a new file.
  doFileCreateClick = (name: string): void => {
    const initialSquare: Square = split(
      solid("blue"),
      solid("orange"),
      solid("purple"),
      solid("red")
    );
    this.setState({
      show: { kind: "editing", name: name, square: initialSquare },
    });
  };

  // Called when the user clicks a link to edit an existing file.
  doFilePickClick = (name: string): void => {
    this.setState({ loading: true });
    loadFile(name, this.doHandleLoadClick);
  };

  // Called when a file is loaded from the server.
  doHandleLoadClick = (name: string, square: Square | null): void => {
    if (square) {
      this.setState({
        show: { kind: "editing", name: name, square: square },
        loading: false,
      });
    } else {
      this.setState({ loading: false });
      console.log("Failed to load file", name);
    }
  };

  // Called when the user clicks to save a file.
  doSaveClick = (name: string, root: Square): void => {
    this.setState({ loading: true });
    this.setState({ show: { kind: "editing", name: name, square: root } });
    saveFile(name, root, this.doHandleSavedResponse);
  };

  // Called when a file is saved to the server.
  doHandleSavedResponse = (name: string, saved: boolean): void => {
    this.setState({ loading: false });
    if (saved) {
      console.log("Saved file", name);
    } else {
      console.error("Failed to save file", name);
    }
  };

  // Called when the user clicks to go back to the file picker.
  doBackClick = (): void => {
    this.doListFilesClick();
    this.setState({ show: { kind: "picking" } });
  };

  // Called to list files from the server.
  doListFilesClick = (): void => {
    this.setState({ loading: true });
    listFiles(this.doHandleListResponse);
  };

  // Called when the list of files is received from the server.
  doHandleListResponse = (names: string[]): void => {
    this.setState({ fileNames: names, loading: false });
  };
}
