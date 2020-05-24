import 'css/spacing.scss';
import './navbar.scss';

import { AppState } from 'store';
import React from 'react';
import { SystemState } from 'store/system/types';
import { connect } from "react-redux";
import { toggleDarkTheme } from 'store/system/actions';
import { toggleSidebar } from 'store/sidebar/actions'
import { BoardState } from 'store/board/types';

interface NavbarProps {
    toggleDarkTheme: typeof toggleDarkTheme;
    toggleSidebar: typeof toggleSidebar;
    system: SystemState;
    board: BoardState;
}

class Navbar extends React.Component<NavbarProps> {

    constructor(props: NavbarProps) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar">
                <div className="branding">

                    {this.props.system.darkThemeIsActive
                        ? <img className="logo-light" src="assets/media/logo/GeoBoard_Light.png" alt="GeoBoard" />
                        : <img className="logo-dark" src="assets/media/logo/GeoBoard_Dark.png" alt="GeoBoard" />
                    }

                </div>

                {this.props.board.activeBoardId &&
                    <div className="board-info">
                        <span className="board-info-prefix">Current board</span>
                        <span className="board-info-name">{this.props.board.activeBoardName}</span>
                    </div>
                }

                <ul className="active-board-users">

                </ul>

                <ul className="nav-links ml-auto">
                    <li className="nav-link" onClick={this.props.toggleDarkTheme}>
                        {this.props.system.darkThemeIsActive
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

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    board: state.board
});

export default connect(mapStateToProps, { toggleDarkTheme, toggleSidebar })(Navbar);
