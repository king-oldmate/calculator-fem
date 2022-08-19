import React from 'react'

const ThemeToggle = ({props}) => {

    const [theme, switchTheme] = props
  return (
    <button onClick={switchTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'}</button>

  )
}

export default ThemeToggle