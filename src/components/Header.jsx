import React, { useState } from 'react';
import './header.css'
import { BsMoon } from 'react-icons/bs'

const Header = () => {

    const [darkMode, setDarkMode] = useState(false);
   
    const theme = {
        light: {
          backgroundColor: 'white',
          color: 'black',
        },
        dark: {
          backgroundColor: 'hsl(209, 23%, 22%)',
          color: 'white',
        },
      };

      const style = darkMode ? theme.dark : theme.light;

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', !darkMode);
        document.body.classList.toggle('dark');
    };

    return (
        <div className='header' style={style}>
            <h1>Where in the world?</h1>
            <div className="dark-mode-toggle" onClick={handleDarkModeToggle} >
                <BsMoon />
                <span>Dark Mode</span>
            </div>
        </div>
    )
}

export default Header
