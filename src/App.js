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

  let [calc, setCalc] = useState({
    sign: "",
    firstNum: 0,
    secondNum: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const btn = e.target.innerHTML;
    if (calc.sign === "") {
      let value =
        calc.firstNum !== 0 && calc.firstNum !== "0"
          ? calc.firstNum + btn
          : btn;
      setCalc({ ...calc, firstNum: value });
    } else {
      let value =
        calc.secondNum !== 0 && calc.firstNum !== "0"
          ? calc.secondNum + btn
          : btn;

      setCalc({ ...calc, secondNum: value });
    }
  };

  const dotClickHandler = (e) => {
    e.preventDefault();
    const btn = e.target.innerHTML;
    if (calc.sign === "") {
      let value =
        !calc.firstNum.toString().includes(btn) &&
        calc.firstNum.toString() + btn;
      setCalc({ ...calc, firstNum: value });
    } else {
      let value =
        !calc.secondNum.toString().includes(btn) &&
        calc.secondNum.toString() + btn;
      setCalc({ ...calc, secondNum: value });
    }
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const btn = e.target.innerHTML;
    if (btn === "+") {
      setCalc({
        ...calc,
        sign: "+",
      });
    } else if (btn === "-") {
      setCalc({
        ...calc,
        sign: "-",
      });
    } else if (btn === "×") {
      setCalc({
        ...calc,
        sign: "*",
      });
    } else {
      setCalc({
        ...calc,
        sign: "/",
      });
    }
  };

  const equalsClickHandler = (e) => {
    e.preventDefault();
    const btn = e.target.innerHTML;
    let result = 0;
    if (calc.firstNum && calc.sign && calc.secondNum) {
      switch (calc.sign) {
        case "+":
          result = Number(calc.firstNum) + Number(calc.secondNum);
          break;
        case "-":
          result = Number(calc.firstNum) - Number(calc.secondNum);
          break;
        case "*":
          result = Number(calc.firstNum) * Number(calc.secondNum);
          break;
        default:
          result = Number(calc.firstNum) / Number(calc.secondNum);
      }
    }
    setCalc({
      firstNum: result.toString(),
      secondNum: 0,
      sign: btn === "=" ? "" : btn,
    });
  };

  const deleteClickHandler = () => {
    let value;
    if (calc.sign === "") {
      if (calc.firstNum.length > 1) {
        value = calc.firstNum.toString().slice(0, calc.firstNum.length - 1);
      } else {
        value = 0;
      }
      setCalc({
        ...calc,
        firstNum: value,
      });
    } else {
      if (calc.secondNum.length > 1) {
        value = calc.secondNum.toString().slice(0, calc.secondNum.length - 1);
      } else {
        value = 0;
      }
      setCalc({
        ...calc,
        secondNum: value,
      });
    }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      firstNum: 0,
      secondNum: 0,
    });
  };

  return (
    <div className="App" data-theme={theme}>
      <Wrapper>
        <div className="top">
          calc
          <ThemeToggle props={[theme, setTheme, switchTheme]} />
        </div>
        <Screen value={calc.secondNum ? calc.secondNum : calc.firstNum} />
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
                onClick={
                  btn === "RESET"
                    ? resetClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : (btn === "+" ||
                        btn === "-" ||
                        btn === "×" ||
                        btn === "÷") &&
                      calc.secondNum
                    ? equalsClickHandler
                    : btn === "+" || btn === "-" || btn === "×" || btn === "÷"
                    ? signClickHandler
                    : btn === "."
                    ? dotClickHandler
                    : btn === "DEL"
                    ? deleteClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default App;
