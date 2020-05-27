import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/movies" className="navbar-brand">CRUD App</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;