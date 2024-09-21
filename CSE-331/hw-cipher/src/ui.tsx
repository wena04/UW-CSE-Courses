import React from "react";
import {
  cipher_encode,
  cipher_decode,
  crazy_caps_encode,
  crazy_caps_decode,
  worm_latin_encode,
  worm_latin_decode,
} from "./latin_ops";
import { explode, compact } from "./char_list";

/** Returns UI that displays a form asking for encode/decode input. */
export const ShowForm = (_: {}): JSX.Element => {
  // TODO: Replace this with something fully functional.
  return (
    <form action="http://localhost:8080/" method="get">
      <label htmlFor="word">Word:</label>
      <input type="text" id="word" name="word"></input>

      <label htmlFor="algo">Algorithm:</label>
      <select id="algo" name="algo">
        {<option value="cipher">Cipher</option>}
        {<option value="crazy-caps">Crazy Caps</option>}
        {<option value="worm-latin">Worm Latin</option>}
      </select>

      <label htmlFor="encode">Encode:</label>
      <input
        type="radio"
        id="encode"
        name="op"
        value="encode"
        defaultChecked
      ></input>
      <label htmlFor="decode">Decode:</label>
      <input type="radio" id="decode" name="op" value="decode"></input>

      <input type="submit" value="Submit"></input>
    </form>
  );
};

/** Properties expected for the ShowResult UI below. */
export type ShowResultProps = {
  readonly word: string;
  readonly algo: "cipher" | "crazy-caps" | "worm-latin";
  readonly op: "encode" | "decode";
};

/**
 * Returns UI that shows the result of applying the specified operation to the
 * given word.
 */
export const ShowResult = (props: ShowResultProps): JSX.Element => {
  if (props.algo === "cipher") {
    // TODO: add a conditional here to call encode/decode appropriately
    //       based on the 'op' parameter in the input prop
    if (props.op === "encode") {
      return (
        <p>
          <code>{compact(cipher_encode(explode(props.word)))}</code>
        </p>
      );
    } else {
      return (
        <p>
          <code>{compact(cipher_decode(explode(props.word)))}</code>
        </p>
      );
    }
  } else if (props.algo === "crazy-caps") {
    if (props.op === "encode") {
      return (
        <p>
          <code>{compact(crazy_caps_encode(explode(props.word)))}</code>
        </p>
      );
    } else {
      return (
        <p>
          <code>{compact(crazy_caps_decode(explode(props.word)))}</code>
        </p>
      );
    }
  } else {
    if (props.op === "encode") {
      return (
        <p>
          <code>{compact(worm_latin_encode(explode(props.word)))}</code>
        </p>
      );
    } else {
      return (
        <p>
          <code>{compact(worm_latin_decode(explode(props.word)))}</code>
        </p>
      );
    }
  }
};
