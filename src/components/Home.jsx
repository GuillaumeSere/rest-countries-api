import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai'
import './home.css';

const Home = ({ darkMode }) => {

    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [regionFilter, setRegionFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(12);

    useEffect(() => {
        fetch("https://restcountries.com/v2/all")
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.log(error));
    }, []);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((country) =>
        country.region.includes(regionFilter)
    );

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCountries.length / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
        return (
            <li
                key={number}
                id={number}
                onClick={(event) => setCurrentPage(Number(event.target.id))}
                className={currentPage === number ? "active" : null}
            >
                {number}
            </li>
        );
    });

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={`container ${darkMode ? 'dark' : ''}`}>
            <div className={`search-input ${darkMode ? 'dark' : ''}`}>
                <div className={`input ${darkMode ? 'dark' : ''}`}>
                    <AiOutlineSearch className={`icon ${darkMode ? 'dark' : ''}`} />
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className={`${darkMode ? 'dark' : ''}`}
                    />
                </div>
                <select
                    value={regionFilter}
                    onChange={(event) => setRegionFilter(event.target.value)}
                    className={`select ${darkMode ? 'dark' : ''}`}
                >
                    <option value="">Filter by region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className="container-card">
                {currentCountries.map((country) => (
                    <Link className={`link ${darkMode ? 'dark' : ''}`} to={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
                        <img src={country.flag} alt={country.name} className={`${darkMode ? 'dark' : ''}`} />
                        <div className={`info ${darkMode ? 'dark' : ''}`} >
                            <h3 className={`card-text ${darkMode ? 'dark' : ''}`}>{country.name}</h3>
                            <p className={`card-text ${darkMode ? 'dark' : ''}`}>Population:  <span>{country.population}</span></p>
                            <p className={`card-text ${darkMode ? 'dark' : ''}`}>Region: <span>{country.region}</span></p>
                            <p className={`card-text ${darkMode ? 'dark' : ''}`}>Capital: <span>{country.capital}</span></p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                <button className="btn" onClick={handlePrevClick} disabled={currentPage === 1}>
                    {"<"}
                </button>
                <ul className="page-numbers">
                    {renderPageNumbers}
                </ul>
                <button className="btn" onClick={handleNextClick} disabled={currentPage === pageNumbers.length}>
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Home;