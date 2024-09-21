import React from 'react';
import './quilt_form.css';


/**
 * Returns HTML for a form that lets the user enter all the inputs needed for
 * the final version of the application.
 * @param _props No properties are needed.
 */
export const QuiltForm = (_props: {}): JSX.Element => {
  return (
      <form action="/">
        <p>Please enter the following information about your quilt:</p>
        <p className="item">Pattern:
            <select name="pattern" defaultValue="A">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select></p>
        <p className="item">Color:
            <select name="color" defaultValue="gold">
              <option value="gold">gold</option>
              <option value="purple">purple</option>
            </select></p>
        <p className="item">Number of rows:
            <input type="number" name="rows" min="1" defaultValue="4"
                   className="rows"></input></p>
        <p className="item">
            <input type="checkbox" name="symmetrize" className="option"></input>
            make it symmetric</p>
        <p><input type="submit" value="Submit"></input></p>
      </form>);
};
