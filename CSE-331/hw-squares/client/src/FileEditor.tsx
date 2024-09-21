import React, { Component, ChangeEvent, MouseEvent } from "react";
import {
  Square,
  Path,
  Color,
  replace,
  find,
  solid,
  split,
  toColor,
} from "./square";
import { SquareElem } from "./square_draw";
import { prefix, len } from "./list";

type FileEditorProps = {
  /** Initial state of the file. */
  initialState: Square;
  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;
  /** The name of the current file being edited. */
  fileName: string;
  /** Called when the back button is clicked */
  onBack: () => void;
};

type FileEditorState = {
  /** The root square of all squares in the design. */
  root: Square;
  /** Path to the square that is currently clicked on, if any. */
  selected?: Path;
  /** the Color of the current square */
  selectedColor: Color;
};

/** UI for editing square design page. */
export class FileEditor extends Component<FileEditorProps, FileEditorState> {
  constructor(props: FileEditorProps) {
    super(props);
    this.state = { root: props.initialState, selectedColor: "white" };
  }

  // render the UI for the file editor
  render = (): JSX.Element => {
    return (
      <div>
        <SquareElem
          width={600n}
          height={600n}
          square={this.state.root}
          selected={this.state.selected}
          onClick={this.doSquareClick}
        ></SquareElem>
        ;{this.renderEditingTools()}
      </div>
    );
  };

  // Returns a div for the editing tools like split, merge, changing colors, save and back buttons
  renderEditingTools = (): JSX.Element => {
    return (
      <div>
        <button onClick={this.doSplitClick}>Split</button>
        <button onClick={this.doMergeClick}>Merge</button>
        <select value={this.state.selectedColor} onChange={this.doColorChange}>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
        </select>
        <button onClick={this.doSaveClick}>Save</button>
        <button onClick={this.props.onBack}>Back</button>
      </div>
    );
  };

  // Called when a square is clicked or selected by the user
  doSquareClick = (path: Path): void => {
    const selectedSquare = find(path, this.state.root);
    if (selectedSquare.kind === "solid") {
      this.setState({ selected: path, selectedColor: selectedSquare.color });
    } else {
      this.setState({ selected: path, selectedColor: "white" });
    }
  };

  // Split that square into four parts (initially, all the same solid color)
  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.selected === undefined) {
      throw new Error("No square selected");
    }
    const selectedSquare = find(this.state.selected, this.state.root);
    const newSquare = split(
      selectedSquare,
      selectedSquare,
      selectedSquare,
      selectedSquare
    );
    const newRoot = replace(this.state.selected, this.state.root, newSquare);
    this.setState({ root: newRoot });
  };

  // Merge the selected square with its siblings (i.e., replace the parent square with a solid square of the same color)
  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.selected === undefined) {
      throw new Error("No square selected");
    }
    const parentPath = prefix(
      len(this.state.selected) - 1n,
      this.state.selected
    ); // Path to the parent square
    const selectedSquare = find(this.state.selected, this.state.root);
    if (selectedSquare.kind === "solid") {
      const newSquare = solid(selectedSquare.color); // Create a new square with the same color as selected square
      const newRoot = replace(parentPath, this.state.root, newSquare); // "Replace" to change color of parent square
      this.setState({ root: newRoot });
    }
  };

  // Change the color of the selected square
  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    if (this.state.selected === undefined) {
      throw new Error("No square selected");
    }
    const newColor = toColor(evt.target.value);
    if (this.state.selected) {
      const selectedSquare = find(this.state.selected, this.state.root);
      if (selectedSquare?.kind === "solid") {
        const newSquare = solid(newColor);
        const newRoot = replace(
          this.state.selected,
          this.state.root,
          newSquare
        );
        this.setState({ root: newRoot, selectedColor: newColor });
      }
    }
  };

  // Save the current design
  doSaveClick = (): void => {
    this.props.onSave(this.props.fileName, this.state.root);
  };
}
