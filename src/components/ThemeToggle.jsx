import React from "react";
import "./ThemeToggle.css";

const ThemeToggle = ({ props }) => {
  const [theme, setTheme, switchTheme] = props;
  return (
    <div className="toggle-container">
      <div>THEME</div>
      <div>
        <ul>
          <li onClick={() => setTheme("dark")}>1</li>
          <li onClick={() => setTheme("light")}>2</li>
          <li onClick={() => setTheme("neon")}>3</li>
        </ul>
        <ul onClick={switchTheme} className="toggle-switch">
          <li
            className={`toggle ${
              theme === "dark"
                ? "first"
                : theme === "light"
                ? "second"
                : "third"
            }`}
          ></li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeToggle;
