import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import { useState } from 'react';
import Error from './components/Error';

function App() {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
                <Route path="/country/:id" element={<CountryDetail />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
