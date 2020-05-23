import React from 'react';
import { toggleSidebar } from 'store/sidebar/actions'
import { connect } from "react-redux";

import 'css/spacing.scss';
import './navbar.scss';

interface NavbarProps {
    toggleSidebar: typeof toggleSidebar;
}

class Navbar extends React.Component<NavbarProps> {

    constructor(props: any) {
        super(props);
    }

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
                    <li className="nav-link" data-target="theme"></li>
                    <li className="nav-link" data-target="logout">
                        <i className="fas fa-sign-out-alt fa-fw mr-1"></i>Log out
                    </li>
                    <li className="nav-link sidebar-link" onClick={this.props.toggleSidebar}>
                        <i className="fas fa-bars fa-lg fa-fw"></i>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default connect(null, { toggleSidebar })(Navbar);
