import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi'
import './countryDetail.css';

const CountryDetail = () => {
    const { alpha3Code } = useParams();
    const { id } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        fetch(`https://restcountries.com/v2/alpha/${id}`)
            .then((response) => response.json())
            .then((data) => setCountry(data))
            .catch((error) => console.log(error));
    }, [id]);

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-detail">
            <Link to="/" className="links"><BiArrowBack />Back</Link>
            <img className="image" src={country.flag} alt={country.name} />
            <div className="description">
                <h2>{country.name || 'N/A'}</h2>
                <div className="description-info">
                    <div className="info-country">
                        {country.nativeName && (
                        <p>Native Name: <span>{country.nativeName ?? 'Unknown'}</span></p>
                        )}
                        <p>Population: <span>{country.population ?? 'Unknown'}</span></p>
                        <p>Region: <span>{country.region ?? 'Unknown'}</span></p>
                        {country.subregion && (
                        <p>Sub Region: <span>{country.subregion ?? 'Unknown'}</span></p>
                        )}
                        {country.capital && (
                        <p>Capital: <span>{country.capital ?? 'Unknown'}</span></p>
                        )}
                    </div>
                    <div className="info-languages">
                        <p>Top Level Domain: <span>{country.topLevelDomain || 'N/A'}</span></p>
                        {country.currencies && (
                        <p>Currencies: <span>{country.currencies.map((currency) => currency.name).join(", ")}</span></p>
                        )}
                        <p>Languages: <span>{country.languages.map((language) => language.name).join(", ")}</span></p>
                    </div>
                </div>
                <div className="border-country">
                    <h3>Border Countries:</h3>
                    <div className="border-link">
                        {country.borders && country.borders.map((border) => (
                            <Link to={`/country/${border}`} key={border}>
                                {border}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryDetail;