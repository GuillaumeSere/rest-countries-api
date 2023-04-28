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
                <h2>{country.name}</h2>
                <div className="description-info">
                    <div className="info-country">
                        <p>Native Name: <span>{country.nativeName}</span></p>
                        <p>Population: <span>{country.population}</span></p>
                        <p>Region: <span>{country.region}</span></p>
                        <p>Sub Region: <span>{country.subregion}</span></p>
                        <p>Capital: <span>{country.capital}</span></p>
                    </div>
                    <div className="info-languages">
                        <p>Top Level Domain: <span>{country.topLevelDomain}</span></p>
                        <p>Currencies: <span>{country.currencies.map((currency) => currency.name).join(", ")}</span></p>
                        <p>Languages: <span>{country.languages.map((language) => language.name).join(", ")}</span></p>
                    </div>
                </div>
                <div className="border-country">
                    <h3>Border Countries:</h3>
                    <div className="border-link">
                        {country.borders.map((border) => (
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