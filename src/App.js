import React from "react";
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
  [".", 0, "×", "÷"],
  ["RESET", "="],
];

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <Wrapper>
        calc
        <ThemeToggle props={[theme, switchTheme]} />
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={
                  btn === "RESET" ? "reset" : btn === "=" ? "equals" : ""
                }
                value={btn}
                onClick={() => {
                  console.log(`${btn} clicked!`);
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
