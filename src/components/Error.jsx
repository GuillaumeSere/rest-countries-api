import React from 'react'
import './error.css'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <main className='not-found' aria-labelledby="page-title">
            <h2 tabIndex="0" id="page-title" className="error-msg">
                Page not found
            </h2>
            <Link to='/' className='error'>Retourner sur la page d’accueil</Link>
        </main>
    )
}

export default Error
