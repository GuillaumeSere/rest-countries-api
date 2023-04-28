import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import { useState } from 'react';

function App() {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
                <Route path="/country/:id" element={<CountryDetail />} />
            </Routes>
        </>
    );
}

export default App;
