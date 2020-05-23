import React from 'react';
import { toggleSidebar } from 'store/sidebar/actions'
import { connect } from "react-redux";

import 'css/spacing.scss';
import './navbar.scss';
import { toggleDarkTheme } from 'store/app/actions';
import { AppState } from 'store/app/types';
import { RootState } from 'store';

interface NavbarProps {
    toggleDarkTheme: typeof toggleDarkTheme;
    toggleSidebar: typeof toggleSidebar;
    app: AppState;
}

class Navbar extends React.Component<NavbarProps> {

    constructor(props: NavbarProps) {
        super(props);
    }

    render() {

        //TODO implementeer dit
        const currentBoard = "Hallo"

        return (
            <nav className="navbar">
                <div className="branding">

                {this.props.app.darkThemeIsActive
                    ? <img className="logo-light" src="../assets/media/logo/GeoBoard_Light.png" alt="GeoBoard" />
                    : <img className="logo-dark" src="../assets/media/logo/GeoBoard_Dark.png" alt="GeoBoard" />
                }

                </div>
                <div className="board-info">
                    <span className="board-info-prefix">Current board</span>
                    <span className="board-info-name">{currentBoard}</span>
                </div>

                <ul className="active-board-users">

                </ul>

                <ul className="nav-links ml-auto">
                    <li className="nav-link" onClick={this.props.toggleDarkTheme}>
                        {this.props.app.darkThemeIsActive
                            ? <i className="far fa-sun fa-lg fa-fw"></i>
                            : <i className="fas fa-moon fa-lg fa-fw"></i>
                        }
                    </li>
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

const mapStateToProps = (state: RootState) => ({
    app: state.app,
})

export default connect(mapStateToProps, { toggleDarkTheme, toggleSidebar })(Navbar);
