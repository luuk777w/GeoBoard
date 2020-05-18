import React from 'react';
import './navbar.scss';
import '../../css/spacing.scss';
import {
    Link
} from "react-router-dom";


export class Navbar extends React.Component {

    render() {

        //TODO implementeer dit
        const currentBoard = "Hallo"

        const displayNone = {
            display: "none"
        }

        return (
            <nav className="navbar">
                <div className="branding">
                    <img className="logo-dark" src="../assets/media/logo/GeoBoard_Dark.png" alt="GeoBoard" />
                    <img className="logo-light" src="../assets/media/logo/GeoBoard_Light.png" alt="GeoBoard" style={displayNone} />
                </div>
                <div className="board-info">
                    <span className="board-info-prefix">Current board</span>
                    <span className="board-info-name">{currentBoard}</span>
                </div>

                <ul className="active-board-users">

                </ul>

                <ul className="nav-links ml-auto">
                    <li className="nav-link"><Link to="/">Home</Link></li>
                    <li className="nav-link" data-target="theme"></li>
                    <li className="nav-link" data-target="logout">
                        <i className="fas fa-sign-out-alt fa-fw mr-1"></i>Log out
                    </li>
                    <li className="nav-link sidebar-link" data-target="sidebar">
                        <i className="fas fa-bars fa-lg fa-fw"></i>
                    </li>
                </ul>

            </nav>
        )
    }
}
