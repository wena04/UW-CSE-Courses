import React from "react";
import { createRoot } from "react-dom/client";
import { nextFib } from "./fib";
import { isPrime, isHighlyComposite } from "./prime";
import "./index.css";

const checkPrime = (age: bigint): string => {
  if (age < 1n) {
    return "";
  }
  return isPrime(age) ? "Your age is also prime!" : "";
};

const checkHighlyComposite = (age: bigint): string => {
  if (age < 1n) {
    return "";
  }
  return isHighlyComposite(age) ? "Your age is also highly composite!" : "";
};

const main: HTMLElement | null = document.getElementById("main");
if (main === null) {
  throw new Error('Uh oh! no "main" element!');
} else {
  const root = createRoot(main);

  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const firstName: string | null = params.get("firstName");
  const nAge: string | null = params.get("age");

  if (firstName === "" || firstName === null) {
    if (nAge === "" || nAge === null) {
      // if both are invalid
      root.render(
        <div className="container">
          <form action="/" className="form-container">
            <p>Hi there! Please enter the following information:</p>
            <p>
              Your first name: <input type="text" name="firstName"></input>
            </p>
            <p>
              Your age: <input type="number" name="age" min="0"></input>
            </p>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      );
    } else {
      // if only firstName is invalid
      root.render(
        <div className="container">
          <p>please enter a first name!</p>
          <br></br>
          <a href="StartOverBttn">Start Over</a>
        </div>
      );
    }
  } else if (nAge === "" || nAge === null) {
    // if only age is invalid
    root.render(
      <div className="container">
        <p>please enter an age!</p>
        <br></br>
        <a href="StartOverBttn">Start Over</a>
      </div>
    );
  } else {
    // when both are valid
    const age = parseInt(nAge, 10);
    const primemsg = checkPrime(BigInt(age));
    const highlyCompositeMsg = checkHighlyComposite(BigInt(age));
    if (isNaN(age) || age < 0) {
      root.render(
        <div className="container">
          <p>Age must be a non-negative number!</p>
          <br></br>
          <a href="StartOverBttn">Start Over</a>
        </div>
      );
    } else {
      if (
        Number(nextFib(BigInt(age))) % age === 0 ||
        Number(nextFib(BigInt(age))) === 0
      ) {
        console.log(Number(nextFib(BigInt(age))) % age);
        root.render(
          <div className="container message">
            <p>
              Hi there, {firstName}! Your age ({age}) is a Fibonacci number!{" "}
              {primemsg} {highlyCompositeMsg}
            </p>
            <br></br>
            <a href="StartOverBttn">Start Over</a>
          </div>
        );
      } else {
        const yearsUntilFib = Number(nextFib(BigInt(age))) - age;
        root.render(
          <div className="container message">
            <p>
              Hi there, {firstName}! Your age ({age}) will be a Fibonacci number
              in {yearsUntilFib} years! {primemsg} {highlyCompositeMsg}
            </p>
            <br></br>
            <a href="StartOverBttn">Start Over</a>
          </div>
        );
      }
    }
  }
}
