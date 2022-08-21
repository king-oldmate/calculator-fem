import React, { lazy, useState } from "react";
import useLocalStorage from "use-local-storage";
import "./App.css";
import Wrapper from "./components/Wrapper";
import ThemeToggle from "./components/ThemeToggle";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  [7, 8, 9, "DEL"],
  [4, 5, 6, "+"],
  [1, 2, 3, "-"],
  [".", 0, "÷", "×"],
  ["RESET", "="],
];

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme =
      theme === "light" ? "neon" : theme === "neon" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleInput = (btn) => {
    console.log(`${btn} clicked!`);
    if (btn >= 0 && btn <= 9 && screenDisplay === "0") {
      const updateScreen = btn.toString();
      setScreenDisplay(updateScreen);
    } else if (btn >= 0 && btn <= 9 && screenDisplay !== "0") {
      const updateScreen = screenDisplay + btn;
      setScreenDisplay(updateScreen);
    } else if (btn === "." && screenDisplay.indexOf(".") === -1) {
      const updateScreen = screenDisplay + btn;
      setScreenDisplay(updateScreen);
    } else if (btn === "+" || btn === "-" || btn === "×" || btn === "÷") {
      if (!firstNumber) {
        setFirstNumber(Number(screenDisplay));
        setScreenDisplay("0");
        setOperation(btn);
      } else if (firstNumber) {
        setSecondNumber(Number(screenDisplay));
        calculateResult();
      }
    } else if (btn === "=" && firstNumber && secondNumber && operation) {
      calculateResult();
    }
  };

  const calculateResult = () => {
    console.log(firstNumber, operation, secondNumber);
    // switch (operation) {
    //   case "+":
    //     const result = firstNumber + secondNumber;
    //     setScreenDisplay(result);
    // }
    // setFirstNumber(null);
    // setSecondNumber(null);
    // setOperation(null);
  };

  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [screenDisplay, setScreenDisplay] = useState("0");

  return (
    <div className="App" data-theme={theme}>
      <Wrapper>
        <div className="top">
          calc
          <ThemeToggle props={[theme, setTheme, switchTheme]} />
        </div>

        <Screen props={[screenDisplay]} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={
                  btn === "RESET"
                    ? "reset"
                    : btn === "="
                    ? "equals"
                    : btn === "DEL"
                    ? "del"
                    : ""
                }
                value={btn}
                onClick={() => {
                  handleInput(btn);
                }}
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default App;
